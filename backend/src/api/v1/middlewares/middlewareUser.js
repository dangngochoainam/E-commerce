const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const db = require("../models");
const sellerService = require("../services/seller.service");
const customerService = require("../services/customer.service");
const shopService = require("../services/shop.service");
const productService = require("../services/product.service");

const middlewareUser = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];

      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) return res.status(403).json("Token is not valid");

        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },

  verifyTokenAndStaff: (req, res, next) => {
    middlewareUser.verifyToken(req, res, async () => {
      if (req.user.roles.includes("STAFF")) {
        next();
      } else {
        return res
          .status(403)
          .json("You're not authorized to access this resource_type");
      }
    });
  },

  verifyTokenAndSeller: (req, res, next) => {
    middlewareUser.verifyToken(req, res, async () => {
      if (req.user.roles.includes("SELLER")) {
        const { data } = await sellerService.getSellerByUserId(req.user.id);
        if (data.isConfirm) {
          req.sellerId = data.id;
          next();
        } else {
          return res.status(400).json({ error: "Seller not confirmed" });
        }
      } else {
        return res
          .status(403)
          .json("You're not authorized to access this resource_type");
      }
    });
  },

  verifyTokenAndCustomer: (req, res, next) => {
    middlewareUser.verifyToken(req, res, async () => {
      if (req.user.roles.includes("CUSTOMER")) {
        const { data, code } = await customerService.getCustomerByUserId(
          req.user.id
        );
        if (data) {
          req.customerId = data.id;
          next();
        } else {
          return res.status(code).json();
        }
      } else {
        return res
          .status(403)
          .json("You're not authorized to access this resource_type");
      }
    });
  },

  // Xác nhận chỉ khi là người bán thực sự mới được CUD trên sản phẩm của shop do mình tạo ra. Không được CUD sản phẩm trên shop của người khác
  verifyTokenAndShop: (req, res, next) => {
    middlewareUser.verifyTokenAndSeller(req, res, async () => {
      let shopId;
      const productId = req.params.id;
      const product = await productService.getProductById(productId);
      if (product.data) shopId = product.data.shopId;
      if (req.body.shopId !== undefined) shopId = req.body.shopId;

      const { data } = await shopService.getShopById(shopId);
      if (data && data.sellerId === req.sellerId) {
        next();
      } else if (data) {
        return res
          .status(403)
          .json({ error: "You're not allowed CUD product to this shop." });
      } else {
        return res.status(404).json({ error: "Not found" });
      }
    });
  },
};

module.exports = middlewareUser;

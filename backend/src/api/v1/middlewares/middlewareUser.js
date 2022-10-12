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
        if (err)
          return res.status(403).json({
            data: {
              error: "Access token không hợp lệ",
            },
          });

        req.user = user;
        next();
      });
    } else {
      return res.status(404).json({
        data: {
          status: 401,
          error: "Bạn chưa đăng nhập tài khoản",
        },
      });
    }
  },

  verifyTokenAndStaff: (req, res, next) => {
    middlewareUser.verifyToken(req, res, async () => {
      if (req.user.roles.includes("STAFF")) {
        next();
      } else {
        return res.status(403).json({
          data: {
            status: 403,
            error: "Bạn không có quyền sử dụng dịch vụ này",
          },
        });
      }
    });
  },
  verifyTokenAndAdmin: (req, res, next) => {
    middlewareUser.verifyToken(req, res, async () => {
      if (req.user.roles.includes("ADMIN")) {
        next();
      } else {
        return res.status(403).json({
          data: {
            status: 403,
            error: "Bạn không có quyền sử dụng dịch vụ này",
          },
        });
      }
    });
  },

  verifyTokenAndSeller: (req, res, next) => {
    middlewareUser.verifyToken(req, res, async () => {
      if (req.user.roles.includes("SELLER")) {
        const { data } = await sellerService.getSellerByUserId(req.user.id);
        if (data.data.isConfirm) {
          req.sellerId = data.data.id;
          next();
        } else {
          return res.status(400).json({
            data: {
              status: 400,
              error: "Người bán chưa được phê duyệt",
            },
          });
        }
      } else {
        return res.status(403).json({
          data: {
            status: 403,
            error: "Bạn không có quyền sử dụng dịch vụ này",
          },
        });
      }
    });
  },

  verifyTokenAndCustomer: (req, res, next) => {
    middlewareUser.verifyToken(req, res, async () => {
      if (req.user.roles.includes("CUSTOMER")) {
        const { data, code } = await customerService.getCustomerByUserId(
          req.user.id
        );
        if (data.data) {
          req.customerId = data.data.id;
          next();
        } else {
          return res.status(code).json();
        }
      } else {
        return res.status(403).json({
          data: {
            status: 403,
            error: "Bạn không có quyền sử dụng dịch vụ này",
          },
        });
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
      if (req.params.shopId) shopId = req.params.shopId;
      if (req.body.shopId !== undefined) shopId = req.body.shopId;

      const { data } = await shopService.getShopById(shopId);
      if (data.data && data.data.sellerId === req.sellerId) {
        next();
      } else if (data.data) {
        return res.status(403).json({
          data: {
            status: 403,
            error: "Bạn không có quyền sử dụng dịch vụ này",
          },
        });
      } else {
        return res.status(404).json({
          data: {
            status: 404,
            error: "Không tìm thấy cửa hàng của bạn",
          },
        });
      }
    });
  },
};

module.exports = middlewareUser;

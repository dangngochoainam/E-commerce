const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const db = require("../models");
const sellerService = require("../services/seller.service");
const shopService = require("../services/shop.service");

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
        const seller = await sellerService.getSellerByUserId(req.user.id);
        if (seller.data.isConfirm) {
          req.sellerId = seller.data.id;
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

  // Xác nhận người bán chỉ được thêm sản phẩm vào shop của mình đã tạo, chứ không được thêm sản phẩm vào shop của người khác
  verifyTokenAndShop: (req, res, next) => {
    middlewareUser.verifyTokenAndSeller(req, res, async() => {
      const {shopId} = req.body; 
      const {data} = await shopService.getShopById(shopId);
      if(data && data.sellerId === req.sellerId){
       next();
      }else if(data){
        return res.status(403).json({error: "You're not allowed add product to this shop."});
      }
      else{
        return res.status(404).json({error: 'Shop not found'});
      }
    });
  }
};

module.exports = middlewareUser;

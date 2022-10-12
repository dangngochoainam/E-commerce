const db = require("../models");
const _User = db.User;
const _Shop = db.Shop;
const _Seller = db.Seller;

module.exports = {
  getUserByUserName: async (username) => {
    try {
      const user = await _User.findOne({
        attributes: [
          "id",
          "firstname",
          "lastname",
          "avatar",
          "lastVisited",
          "roles",
          "status",
          "birthday",
          "email",
          "address",
          "phone",
        ],
        where: {
          username: username,
        },
      });
      if (user) {
        return {
          code: 200,
          data: {
            status: 200,

            data: user,
          },
        };
      }
      return {
        code: 404,
        data: {
          status: 404,
          error: "Người dùng không tồn tại",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getUserIDByShopID: async (shopId) => {
    try {
      const shop = await _Shop.findByPk(shopId);

      const seller = await _Seller.findByPk(shop.sellerId);

      return {
        code: 200,
        data: {
          status: 200,
          data: seller.userId,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getUserByID: async (id) => {
    try {
      const user = await _User.findOne({
        include: {
          model: _Seller,
          attributes: ["isConfirm"],
        },
        attributes: [
          "id",
          "firstname",
          "lastname",
          "avatar",
          "lastVisited",
          "roles",
          "status",
          "birthday",
          "email",
          "address",
          "phone",
        ],
        where: {
          id: id,
        },
      });
      console.log;
      if (user) {
        return {
          code: 200,
          data: {
            status: 200,

            data: user,
          },
        };
      }
      return {
        code: 404,
        data: {
          status: 404,
          error: "Người dùng không tồn tại",
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};

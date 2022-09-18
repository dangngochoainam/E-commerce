const db = require("../models");
const _Shop = db.Shop;

module.exports = {
  getShopById: async (shopId) => {
    try {
      const shop = await _Shop.findByPk(shopId);
      if (shop) {
        return {
          code: 200,
          data: shop,
        };
      }

      return {
        code: 404,
        message: "Shop not found",

        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getShopsBySellerId: async (sellerId) => {
    try {
      const shop = await _Shop.findAll({
        where: {
          sellerId: sellerId,
        },
      });
      if (shop) {
        return {
          code: 200,
          data: shop,
        };
      }

      return {
        code: 404,
        message: "Shop not found",

        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  resgister: async ({shop}) => {
    try {
      const newShop = await _Shop.create({...shop});
      if (newShop) {
        return {
          code: 201,
          data: newShop,
        };
      }
      return {
        code: 400,
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};

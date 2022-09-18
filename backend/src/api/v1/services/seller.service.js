const db = require("../models");
const _Seller = db.Seller;

module.exports = {
  getSellerByUserId: async (userId) => {
    try {
      const seller = await _Seller.findOne({ where: { userId: userId } });
      if (seller)
        return {
          code: 200,
          data: seller,
        };
      return {
        code: 404,
        message: "Seller not found",
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getSellersUnConfirm: async () => {
    try {
      const sellers = await _Seller.findAll({
        where: {
          isConfirm: false,
        },
      });

      if (sellers) {
        return {
          code: 200,
          data: sellers,
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

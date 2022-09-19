const sellerService = require("../services/seller.service");

module.exports = {
  getSellersUnConfirm: async (req, res) => {
    try {
      const { code, data } = await sellerService.getSellersUnConfirm();
      return res.status(code).json( data );
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};

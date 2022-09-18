const shopService = require("../services/shop.service");

module.exports = {
  register: async (req, res) => {
      const shop = req.body;
      shop.createdAt = new Date();
      shop.updatedAt = new Date();
      shop.sellerId = req.sellerId;
    try {
      const { code, data } = await shopService.resgister({shop});
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },
};

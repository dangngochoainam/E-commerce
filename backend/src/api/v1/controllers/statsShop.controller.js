const statsShopService = require("../services/statsShop.service");

module.exports = {
  revenueStats: async (req, res) => {
    let params = req.body;
    params.shopId = req.params.shopId;
    try {
      const { code, data } = await statsShopService.revenueStats(params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};

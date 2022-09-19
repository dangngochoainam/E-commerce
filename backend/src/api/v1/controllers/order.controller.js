const orderService = require("../services/order.service");

module.exports = {
  buy: async (req, res) => {
    const cart = req.body;
    try {
      const { code, data } = await orderService.buy(cart);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};

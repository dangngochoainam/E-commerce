const orderService = require("../services/order.service");
const productService = require("../services/product.service");


module.exports = {
  // Thanh toán các sản phẩm chỉ thuộc về 1 shop
  buy: async (req, res) => {
    const cart = req.body;
    cart.customerId = req.customerId;
    try {
      const { code, data } = await orderService.buy({ order: cart });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },

  confirmOrder: async (req, res) => {
    const order = req.body;
    try {
      const {code, error} = await orderService.confirmOrder(order)
      return res.status(code).json(error);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },

  // Thanh toán 1 lúc nhiều sản phẩm, các sản phẩm thuộc các shop khác nhau
  // buy: async (req, res) => {
  //   const cart = req.body;
  //   try {
  //     const { code, data } = await orderService.buy(cart);
  //     return res.status(code).json(data);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json();
  //   }
  // },
};

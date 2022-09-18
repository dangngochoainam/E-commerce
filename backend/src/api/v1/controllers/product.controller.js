const productService = require("../services/product.service");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const { code, element } = await productService.getAllProducts();
      return res.status(code).json(element);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error)
    }
  },

  addProduct: async(req, res) => {
    const product = req.body;
    try {
      const {code, data} = await productService.addProduct({product});
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  }
};

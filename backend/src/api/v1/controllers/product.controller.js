const productService = require("../services/product.service");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const { code, element } = await productService.getAllProducts();
      return res.status(code).json(element);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  addProduct: async (req, res) => {
    const product = req.body;
    try {
      const { code, data } = await productService.addProduct({ product });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },

  editProduct: async (req, res) => {
    const product = req.body;
    const productId = req.params.id;
    try {
      const { code } = await productService.editProduct({
        productId: productId,
        newProduct: product,
      });
      return res.status(code).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      const { code } = await productService.deleteProduct(productId);
      return res.status(code).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};

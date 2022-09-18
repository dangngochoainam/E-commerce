const db = require("../models");
const _Product = db.Product;

module.exports = {
  getAllProducts: async () => {
    try {
      const products = await _Product.findAll();
      return {
        code: 200,
        element: products,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getProductById: async (productId) => {
    try {
      const product = await _Product.findByPk(productId);
      if (product) {
        return {
          code: 200,
          data: product,
        };
      }

      return {
        code: 404,
        message: "Product not found",
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  addProduct: async ({ product }) => {
    try {
      const newProduct = await _Product.create({ ...product });
      if (newProduct)
        return {
          code: 201,
          data: newProduct,
        };
      return {
        code: 400,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};

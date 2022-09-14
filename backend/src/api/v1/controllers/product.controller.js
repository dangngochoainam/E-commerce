const { getAllProducts } = require("../services/product.service");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const { code, element } = await getAllProducts();
      return res.status(code).json(element);
    } catch (error) {
      console.log(error);
    }
  },
};

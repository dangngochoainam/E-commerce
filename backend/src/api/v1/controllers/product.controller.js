const productService = require("../services/product.service");

module.exports = {
  compareProduct: async (req, res) => {
    const { productId1, productId2 } = req.body;
    try {
      const { code, data } = await productService.compareProduct({
        productId1,
        productId2,
      });

      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
  getAllProduct: async (req, res) => {
    try {
      let params = req.query;
      const { code, data } = await productService.getAllProduct(params);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  getAllProductByShopId: async (req, res) => {
    try {
      const shopId = req.params.shopId;
      const { code, data } = await productService.getAllProductByShopId(shopId);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const { code, data } = await productService.getProductById(id);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  addProduct: async (req, res) => {
    const product = req.body;
    product.createdAt = new Date();
    product.updatedAt = new Date();
    if (req.files) product.image = req.files.image.tempFilePath;
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
    product.updatedAt = new Date();
    if (req.files) product.image = req.files.image.tempFilePath;
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

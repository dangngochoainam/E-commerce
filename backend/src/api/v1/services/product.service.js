const db = require("../models");
const cloudinary = require("../../../config/cloudinary");
const _Product = db.Product;
const _OrderDetails = db.OrderDetails;
const { Op } = require("sequelize");

module.exports = {
  compareProduct: async ({ productId1, productId2 }) => {
    try {
      const product1 = await _Product.findByPk(productId1, {include: db.Shop});
      const product2 = await _Product.findByPk(productId2, {include: db.Shop});
      if (product1 && product2) {
        return {
          code: 200,
          data: {
            product1,
            product2,
          },
        };
      }
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

  getAllProduct: async (params) => {
    try {
      const { page, kw, fP, tP, sortBy, order } = params;
      let start, end;
      if (page > 0) {
        start = parseInt((page - 1) * process.env.PAGE_SIZE);
        end = parseInt(start + parseInt(process.env.PAGE_SIZE));
      }
      const products = await _Product.findAll({
        where: {
          [Op.and]: [
            kw ? { name: { [Op.substring]: kw } } : {},
            fP ? { price: { [Op.gte]: fP } } : {},
            tP ? { price: { [Op.lte]: tP } } : {},
          ],
        },
        offset: start,
        limit: end,
        order: [sortBy ? [sortBy, order] : ["name", "asc"]],
      });
      return {
        code: 200,
        data: products,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getAllProductByShopId: async (shopId) => {
    try {
      const products = await _Product.findAll({
        where: {
          shopId: shopId,
        },
      });
      return {
        code: 200,
        data: products,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getAllProductByOrderId: async (orderId) => {
    try {
      const orderDetails = await _OrderDetails.findAll({
        where: {
          orderId: orderId,
        },
      });

      const productIds = orderDetails.reduce(
        (rs, item) => [...rs, item.productId],
        []
      );

      const products = await _Product.findAll({
        where: {
          id: productIds,
        },
      });

      return {
        code: 200,
        data: products,
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
      const result = await cloudinary.uploader.upload(product.image, {
        folder: "Ecommerce",
        resource_type: "auto",
      });
      product.image = result.secure_url;
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
  editProduct: async ({ productId, newProduct }) => {
    try {
      if (newProduct.image) {
        const result = await cloudinary.uploader.upload(newProduct.image, {
          folder: "Ecommerce",
          resource_type: "auto",
        });
        newProduct.image = result.secure_url;
      }
      const data = await _Product.update(
        {
          ...newProduct,
        },
        {
          where: { id: productId },
        }
      );
      if (data[0] !== 0) {
        return {
          code: 200,
        };
      } else {
        return {
          code: 404,
        };
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (productId) => {
    try {
      const data = await _Product.destroy({
        where: {
          id: productId,
        },
      });
      if (data)
        return {
          code: 204,
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

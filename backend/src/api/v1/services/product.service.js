const db = require("../models");
const cloudinary = require("../../../config/cloudinary");
const _Product = db.Product;
const _OrderDetails = db.OrderDetails;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

const productService = {
  getProductToCompare: async (productId) => {
    try {
      const product = await db.sequelize.query(
        `select p.*, s.name as 'Ten shop', s.rate as 'Rate shop', sum(d.quantity) as 'Tong san pham ban duoc'
      from ecommerce_db.order_details as d, ecommerce_db.product as p, ecommerce_db.order as o, ecommerce_db.shop s 
      where d.productId = p.id and o.id = d.orderId and p.shopId = s.id and p.id = :productId`,
        {
          replacements: {
            productId: productId,
          },
          type: QueryTypes.SELECT,
        }
      );
      return product;
    } catch (error) {
      console.log(error);
    }
  },
  compareProduct: async ({ productId1, productId2 }) => {
    try {
      const product1 = await productService.getProductToCompare(productId1);
      const product2 = await productService.getProductToCompare(productId2);
      if (product1 && product2) {
        return {
          code: 200,
          data: {
            status: 200,
            data: {
              product1,
              product2,
            },
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
  getProductById: async (productId) => {
    try {
      const product = await _Product.findByPk(productId);
      return {
        code: 200,
        data: {
          status: 200,
          data: product,
        },
      };
    } catch (error) {
      return {
        code: 500,
        data: {
          status: 500,
          error,
        },
      };
    }
  },

  getAllProduct: async (params) => {
    try {
      const { page, kw, fP, tP, sortBy, order, cate, subCate } = params;

      let start;
      if (page > 0) {
        start = parseInt((page - 1) * process.env.PAGE_SIZE);
      }

      const products = await _Product.findAll({
        where: {
          [Op.and]: [
            kw ? { name: { [Op.substring]: kw } } : {},
            fP ? { price: { [Op.gte]: fP } } : {},
            tP ? { price: { [Op.lte]: tP } } : {},
            cate ? { categoryId: cate } : {},
            subCate ? { subCategoryId: subCate } : {},
          ],
        },
        offset: start,
        limit: parseInt(process.env.PAGE_SIZE),
        order: [sortBy ? [sortBy, order] : ["id", "asc"]],
      });

      const productAmount = await _Product.count({
        where: {
          [Op.or]: [
            kw ? { name: { [Op.substring]: kw } } : {},
            cate ? { categoryId: cate } : {},
            subCate ? { subCategoryId: subCate } : {},
            !kw && !cate && !subCate ? { isActive: true } : {},
          ],
        },
      });

      return {
        code: 200,
        data: {
          status: 200,
          data: {
            products,
            productAmount,
          },
        },
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
        data: {
          status: 200,

          data: products,
        },
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
          data: {
            status: 201,

            data: newProduct,
          },
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

  getAllProductByShopId: async (params) => {
    try {
      const { shopId, page, kw, fP, tP, sortBy, order, cate, subCate } = params;

      let start;
      if (page > 0) {
        start = parseInt((page - 1) * process.env.PAGE_SIZE);
      }

      const products = await _Product.findAll({
        where: {
          [Op.and]: [
            shopId ? { shopId: shopId } : {},
            kw ? { name: { [Op.substring]: kw } } : {},
            fP ? { price: { [Op.gte]: fP } } : {},
            tP ? { price: { [Op.lte]: tP } } : {},
            cate ? { categoryId: cate } : {},
            subCate ? { subCategoryId: subCate } : {},
          ],
        },
        offset: start,
        limit: parseInt(process.env.PAGE_SIZE),
        order: [sortBy ? [sortBy, order] : ["id", "asc"]],
      });

      const productAmount = await _Product.count({
        where: {
          [Op.and]: [
            shopId ? { shopId: shopId } : {},
            kw ? { name: { [Op.substring]: kw } } : {},
            cate ? { categoryId: cate } : {},
            subCate ? { subCategoryId: subCate } : {},
            !kw && !cate && !subCate ? { isActive: true } : {},
          ],
        },
      });

      return {
        code: 200,
        data: {
          status: 200,
          data: {
            products,
            productAmount,
          },
        },
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
          data: {
            status: 200,
          },
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
          data: {
            status: 204,
          },
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

module.exports = productService;

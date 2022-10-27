const db = require('../models');
const _Shop = db.Shop;
const _Seller = db.Seller;
const cloudinary = require('../../../config/cloudinary');

module.exports = {
  getShopById: async (shopId) => {
    try {
      const shop = await _Shop.findByPk(shopId);
      if (shop) {
        return {
          code: 200,
          data: {
            status: 200,

            data: shop,
          },
        };
      }

      return {
        code: 404,
        data: {
          error: 'Cửa hàng không tồn tại',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  getShopsByUserId: async (userId) => {
    try {
      console.log(userId);
      const seller = await _Seller.findOne({
        where: {
          userId: userId,
        },
      });

      if (!seller) {
        return {
          code: 404,
          data: {
            status: 404,
            error: 'Người dùng không có cửa hàng',
          },
        };
      }

      const shops = await _Shop.findAll({
        where: {
          sellerId: seller.id,
        },
      });

      return {
        code: 200,
        data: {
          status: 200,
          data: shops,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        data: {
          status: 500,
        },
      };
    }
  },

  getAllShop: async () => {
    try {
      const shops = await _Shop.findAll();

      return {
        code: 200,
        data: {
          status: 200,
          data: shops,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        data: {
          status: 500,
        },
      };
    }
  },

  getShopsBySellerId: async (sellerId) => {
    try {
      const shop = await _Shop.findAll({
        where: {
          sellerId: sellerId,
        },
      });
      if (shop) {
        return {
          code: 200,
          data: {
            status: 200,

            data: shop,
          },
        };
      }

      return {
        code: 404,
        data: {
          status: 404,
          error: 'Cửa hàng không tồn tại',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },

  resgister: async ({ shop }) => {
    try {
      const result = await cloudinary.uploader.upload(shop.image, {
        folder: 'Ecommerce',
        resource_type: 'auto',
      });
      const newShop = await _Shop.create({ ...shop, image: result.secure_url });
      if (newShop) {
        return {
          code: 201,
          data: {
            status: 201,

            data: newShop,
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
};

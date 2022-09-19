const db = require("../models");
const _Review = db.Review;
const _Product = db.Product;
const _Shop = db.Shop;

const reviewService = {
  getReviewByProductId: async (productId) => {
    try {
      const reviews = await _Review.findAll({
        where: {
          productId: productId,
        },
      });
      if (reviews) {
        return {
          code: 200,
          data: reviews,
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
  addReview: async ({ review }) => {
    try {
      const newReview = await _Review.create({ ...review });
      if (newReview) {
        const product = await newReview.getProduct();
        const shopId = product.shopId;
        const { rateProduct } = await reviewService.countRateOnProduct(
          newReview.productId
        );

        await _Product.update(
          { rate: rateProduct },
          {
            where: {
              id: newReview.productId,
            },
          }
        );

        const { rateShop } = await reviewService.countRateOnShop(shopId);
        await _Shop.update(
          { rate: rateShop },
          {
            where: {
              id: shopId,
            },
          }
        );

        return {
          code: 201,
          data: newReview,
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

  countRateOnProduct: async (productId) => {
    try {
      const rate = await db.sequelize.query(
        `select avg(rate) as rateProduct from review where productId = :productId`,
        {
          replacements: { productId: productId },
          plain: true,
        }
      );
      return rate;
    } catch (error) {
      console.log(error);
    }
  },

  countRateOnShop: async (shopId) => {
    try {
      const rate = await db.sequelize.query(
        `select avg(rate) as rateShop from product where shopId = :shopId`,
        {
          replacements: { shopId: shopId },
          plain: true,
        }
      );
      return rate;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = reviewService;
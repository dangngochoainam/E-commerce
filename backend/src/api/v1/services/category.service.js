const db = require("../models/index");
const _Category = db.Category;
const _SubCategory = db.SubCategory;

module.exports = {
  getAllCategories: async () => {
    try {
      const categories = await _Category.findAll();
      return {
        code: 200,
        data: {
          status: 200,
          data: categories
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
  getSubCategory: async (categoryId) => {
    try {
      const subCategories = await _SubCategory.findAll({
        where: {
          categoryId: categoryId,
        },
      });

      if (subCategories)
        return {
          code: 200,
          data: {
            stauts: 200,
            data: subCategories
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

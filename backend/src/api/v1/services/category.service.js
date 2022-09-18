const db = require("../models/index");
const _Category = db.Category;

module.exports = {
  getAllCategories: async () => {
    try {
      const categories = await _Category.findAll();
      return {
        code: 200,
        elements: categories,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
      };
    }
  },
};

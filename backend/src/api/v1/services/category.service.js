const db = require("../models/index");

module.exports = {
  getAllCategories: async () => {
    const categories = await db.Category.findAll();
    return {
      code: 200,
      elements: categories,
    };
  },
};

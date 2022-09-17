const db = require("../models/index");
const _Category = db.Category

module.exports = {
  getAllCategories: async () => {
    const categories = await _Category.findAll();
    return {
      code: 200,
      elements: categories,
    };
  },
};

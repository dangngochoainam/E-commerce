const { getAllCategories } = require("../services/category.service");

module.exports = {
  getAllCategories: async (req, res, next) => {
    const { code, elements } = await getAllCategories();
    return res.status(code).json({ result: elements });
  },
};

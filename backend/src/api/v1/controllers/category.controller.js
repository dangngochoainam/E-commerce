const categoryController = require("../services/category.service");

module.exports = {
  getAllCategories: async (req, res, next) => {
    const { code, elements } = await categoryController.getAllCategories();
    return res.status(code).json({ result: elements });
  },
};

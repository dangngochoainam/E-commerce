const categoryController = require("../services/category.service");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const { code, data } = await categoryController.getAllCategories();
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },

  getSubCategory: async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
      const { code, data } = await categoryController.getSubCategory(
        categoryId
      );
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};

const categoryService = require("../controllers/category.controller");
const router = require("express").Router();

router.get("/", categoryService.getAllCategories);
router.get("/:categoryId/sub", categoryService.getSubCategory);

module.exports = router;

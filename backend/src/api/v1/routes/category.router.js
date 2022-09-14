const { getAllCategories } = require("../controllers/category.controller");
const router = require("express").Router();

router.get("/", getAllCategories);

module.exports = router;

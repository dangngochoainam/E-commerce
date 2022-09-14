const router = require("express").Router();
const { getAllProducts } = require("../controllers/product.controller");

router.get("/", getAllProducts);

module.exports = router;

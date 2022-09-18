const router = require("express").Router();
const productController = require("../controllers/product.controller");
const middlewareUser = require("../middlewares/middlewareUser")

router.get("/", productController.getAllProducts);
router.post('/', middlewareUser.verifyTokenAndShop, productController.addProduct)

module.exports = router;

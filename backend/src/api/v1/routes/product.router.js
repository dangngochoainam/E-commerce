const router = require("express").Router();
const productController = require("../controllers/product.controller");
const middlewareUser = require("../middlewares/middlewareUser")

router.get("/", productController.getAllProducts);
router.post('/', middlewareUser.verifyTokenAndShop, productController.addProduct)
router.put("/:id", middlewareUser.verifyTokenAndShop, productController.editProduct)
router.delete("/:id", middlewareUser.verifyTokenAndShop, productController.deleteProduct)


module.exports = router;

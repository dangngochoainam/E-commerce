const router = require('express').Router();
const shopController = require('../controllers/shop.controller')
const productController = require("../controllers/product.controller");
const middlewareUser = require('../middlewares/middlewareUser')


router.post('/', middlewareUser.verifyTokenAndSeller, shopController.register)
router.get('/:shopId', shopController.getShopById)
router.get('/:shopId/products', productController.getAllProductByShopId)

module.exports = router
const router = require('express').Router();
const shopController = require('../controllers/shop.controller')
const productController = require("../controllers/product.controller");
const middlewareUser = require('../middlewares/middlewareUser')


router.post('/', middlewareUser.verifyTokenAndSeller, shopController.register)
router.get('/:shopId', productController.getAllProductByShopId)

module.exports = router
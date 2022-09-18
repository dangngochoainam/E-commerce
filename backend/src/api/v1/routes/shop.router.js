const router = require('express').Router();
const shopController = require('../controllers/shop.controller')
const middlewareUser = require('../middlewares/middlewareUser')


router.post('/', middlewareUser.verifyTokenAndSeller, shopController.register)

module.exports = router
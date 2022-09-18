const router = require('express').Router();
const sellerController = require('../controllers/seller.controller')
const middlewareUser = require('../middlewares/middlewareUser')

router.get('/unConfirm', middlewareUser.verifyTokenAndStaff, sellerController.getSellersUnConfirm)

module.exports = router;
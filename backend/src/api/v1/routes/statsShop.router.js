const router = require('express').Router();
const statsShopController = require('../controllers/statsShop.controller')

router.post("/:shopId", statsShopController.revenueStats)

module.exports = router
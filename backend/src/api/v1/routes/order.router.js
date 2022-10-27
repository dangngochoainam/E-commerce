const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const middlewareUser = require('../middlewares/middlewareUser');

router.post('/buy', middlewareUser.verifyTokenAndCustomer, orderController.buy);
router.post(
  '/confirmOrder',
  middlewareUser.verifyTokenAndShop,
  orderController.confirmOrder
);
router.post(
  '/getOrderUnConfirm',
  middlewareUser.verifyTokenAndShop,
  orderController.getOrderUnConfirm
);

module.exports = router;

const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const middlewareUser = require("../middlewares/middlewareUser")

router.post("/buy", middlewareUser.verifyTokenAndCustomer, orderController.buy);

module.exports = router;

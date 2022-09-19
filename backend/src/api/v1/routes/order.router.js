const router = require("express").Router();
const orderController = require("../controllers/order.controller");

router.post("/buy", orderController.buy);

module.exports = router;

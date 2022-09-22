const router = require("express").Router();
const statsShopController = require("../controllers/statsShop.controller");
const middlewareUser = require("../middlewares/middlewareUser");

router.post(
  "/:shopId",
  middlewareUser.verifyTokenAndShop,
  statsShopController.revenueStats
);

module.exports = router;

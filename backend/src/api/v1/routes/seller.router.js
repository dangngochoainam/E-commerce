const router = require("express").Router();
const sellerController = require("../controllers/seller.controller");
const middlewareUser = require("../middlewares/middlewareUser");

router.get(
  "/unConfirm",
  middlewareUser.verifyTokenAndStaff,
  sellerController.getSellersUnConfirm
);
router.get("/:userId", sellerController.getSellerByUserId);

module.exports = router;

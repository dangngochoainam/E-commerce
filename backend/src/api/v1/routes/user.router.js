const router = require("express").Router();
const userController = require("../controllers/user.controller");
const shopController = require("../controllers/shop.controller");

router.get("/:id", userController.getUserByID);
router.get("/:id/shops", shopController.getShopsByUserId);
router.post("/:userId/registerSeller", userController.registerSeller);

module.exports = router;

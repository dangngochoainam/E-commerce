const router = require("express").Router();
const notificationController = require("../controllers/notification.controller");
const middlewareUser = require("../middlewares/middlewareUser");

router.post("/", middlewareUser.verifyToken, notificationController.create);
router.get(
  "/",
  middlewareUser.verifyToken,
  notificationController.getNotificationByUserId
);

module.exports = router;

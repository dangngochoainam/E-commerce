const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const middlewareUser = require("../middlewares/middlewareUser");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refreshToken", authController.requestRefreshToken);
router.post("/logout", middlewareUser.verifyToken, authController.logout);

module.exports = router;

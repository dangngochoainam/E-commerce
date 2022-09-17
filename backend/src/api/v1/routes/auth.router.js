const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const middlewareUser = require("../middlewares/middlewareUser");
const upload = require("../../../config/multer");

router.post("/register", upload.single("avatar"), authController.register);
router.post("/login", authController.login);
router.post("/refreshToken", authController.requestRefreshToken);
router.post("/logout", middlewareUser.verifyToken, authController.logout);

module.exports = router;

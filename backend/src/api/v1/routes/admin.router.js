const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const middlewareUser = require("../middlewares/middlewareUser");

router.post("/", middlewareUser.verifyTokenAndAdmin, adminController.stats);

module.exports = router;

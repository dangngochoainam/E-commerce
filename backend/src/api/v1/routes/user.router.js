const { registerUser } = require("../controllers/user.controller");
const router = require("express").Router();
const upload = require('../../../config/multer')


router.post("/", upload.single('avatar'), registerUser);

module.exports = router;

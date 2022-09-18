const router = require('express').Router();
const staffController = require('../controllers/staff.controller')
const middlewareUser = require('../middlewares/middlewareUser')


router.post('/grantRole', middlewareUser.verifyTokenAndStaff, staffController.grantRole)

module.exports = router;
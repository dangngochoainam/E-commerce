const stripeController = require('../controllers/stripe.controller');
const router = require('express').Router();

router.post('/payment', stripeController.payment);

module.exports = router;

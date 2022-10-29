const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = {
  payment: async (req, res, next) => {
    try {
      const stripeRes = await stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd',
      });
      return res.status(200).json(stripeRes);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};

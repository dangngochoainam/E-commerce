const reviewService = require("../services/review.service");

module.exports = {
  getReviewByProductId: async (req, res) => {
    const productId = req.params.productId;
    try {
      const { code, data } = await reviewService.getReviewByProductId(productId);
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },

  addReview: async (req, res) => {
    const review = req.body;
    review.customerId = req.customerId;
    review.createdAt = new Date();
    review.updatedAt = new Date();
    try {
      const { code, data } = await reviewService.addReview({ review });
      return res.status(code).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  },
};

const router = require("express").Router();
const reviewController = require("../controllers/review.controller");
const middlewareUser = require("../middlewares/middlewareUser");

router.post(
  "/",
  middlewareUser.verifyTokenAndCustomer,
  reviewController.addReview
);
router.get("/rateOfProduct", reviewController.countRateOfProduct);
router.get("/:productId", reviewController.getReviewByProductId);

module.exports = router;

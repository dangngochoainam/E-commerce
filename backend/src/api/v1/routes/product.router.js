const router = require("express").Router();
const productController = require("../controllers/product.controller");
const commentController = require("../controllers/comment.controller");
const middlewareUser = require("../middlewares/middlewareUser");

router.get("/", productController.getAllProduct);
router.post(
  "/",
  middlewareUser.verifyTokenAndShop,
  productController.addProduct
);
router.post("/compare", productController.compareProduct);
router.get("/:id", productController.getProductById);
router.get("/:id/comments", commentController.getCommentByProductId);
router.put(
  "/:id",
  middlewareUser.verifyTokenAndShop,
  productController.editProduct
);
router.delete(
  "/:id",
  middlewareUser.verifyTokenAndShop,
  productController.deleteProduct
);

module.exports = router;

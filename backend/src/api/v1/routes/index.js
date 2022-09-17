const router = require("express").Router();
const categoryRouter = require("./category.router");
const userRouter = require("./user.router");
const productRouter = require("./product.router");
const authRouter = require("./auth.router");

router.use("/v1/ecommerce/categories", categoryRouter);
router.use("/v1/ecommerce/users", userRouter);
router.use("/v1/ecommerce/", authRouter);
router.use("/v1/ecommerce/products", productRouter);


module.exports = router;

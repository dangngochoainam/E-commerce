import { configureStore } from "@reduxjs/toolkit";
import authSlide from "./authSlide";
import productSlide from "./productSlide";

export default configureStore({
  reducer: {
    auth: authSlide,
    productCompare: productSlide
  },
});

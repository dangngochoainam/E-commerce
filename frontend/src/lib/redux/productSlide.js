import { createSlice } from "@reduxjs/toolkit";

const productSlide = createSlice({
  name: "productCompare",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload.id);
    },
    removeAll: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, removeAll } = productSlide.actions;

export default productSlide.reducer;

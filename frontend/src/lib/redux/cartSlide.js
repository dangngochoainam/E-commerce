import { createSlice } from '@reduxjs/toolkit';

const cartSlide = createSlice({
  name: 'cart',
  initialState: {
    totalProduct: 0,
  },
  reducers: {
    countProduct(state, action) {
      state.totalProduct = action.payload;
    },

  },
});

export const { countProduct } = cartSlide.actions;

export default cartSlide.reducer;

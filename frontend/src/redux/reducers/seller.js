import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};
export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })

    // GET ALL SELLERS FOR ---ADMIN
    .addCase("getAllSellersAdminRequest", (state) => {
      state.isLoading = false;
    })
    .addCase("getAllSellersAdminSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase("getAllSellersAdminFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("clearError", (state) => {
      state.error = null;
    });
});

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productLoading: false,
  products: [],
  allProducts: [],
  adminProducts: [], // ✅ important
  product: null,
  error: null,
  success: false,
  message: null,
};


export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.message = "Product deleted successfully";
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("getAllProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
 
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

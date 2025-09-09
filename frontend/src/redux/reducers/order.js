import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder

    // GET ALL ORDERS FOR A USER
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // GET ALL ORDERS FOR A SHOP
    .addCase("getAllOrdersShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersShopSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // GET ALL ORDERS FOR A ---ADMIN
    .addCase("adminAllOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminAllOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase("adminAllOrdersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // FOR CLEAR ERRORS
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

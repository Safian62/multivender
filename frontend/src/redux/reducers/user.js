import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder

    // LOAD OUR USER
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    //UPDATE  USER DETAILS
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // UPDATE USER ADDRESS
    .addCase("updateUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFail", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    .addCase("clearUpdateAddressMessage", (state) => {
      state.successMessage = null;
    })

    // DELETE USSER ADDRESS
    .addCase("deleteUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;

      state.user = action.payload.user;
    })
    .addCase("deleteUserAddressFail", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })

    // GET ALL USERS FOR ---ADMIN
    .addCase("getAllUsersAdminRequest", (state) => {
      state.userLoading = true;
    })
    .addCase("getAllUsersAdminSuccess", (state, action) => {
      state.userLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersAdminFailed", (state, action) => {
      state.userLoading = false;
      state.error = action.payload;
    })

    .addCase("clearError", (state) => {
      state.error = null;
    });
});

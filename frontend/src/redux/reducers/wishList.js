import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishList: localStorage.getItem("wishListItems")
    ? JSON.parse(localStorage.getItem("wishListItems"))
    : [],
};

export const wishListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishList", (state, action) => {
      const item = action.payload;
      const isItemExists = state.wishList.find((i) => i._id === item._id);

      let updatedWishlist;
      if (isItemExists) {
        updatedWishlist = state.wishList.map((i) =>
          i._id === isItemExists._id ? item : i
        );
      } else {
        updatedWishlist = [...state.wishList, item];
      }

      // Save to localStorage
      localStorage.setItem("wishListItems", JSON.stringify(updatedWishlist));

      return {
        ...state,
        wishList: updatedWishlist,
      };
    })

    .addCase("removeFromWishList", (state, action) => {
      const updatedWishlist = state.wishList.filter(
        (i) => i._id !== action.payload
      );

      // Save to localStorage
      localStorage.setItem("wishListItems", JSON.stringify(updatedWishlist));

      return {
        ...state,
        wishList: updatedWishlist,
      };
    });
});

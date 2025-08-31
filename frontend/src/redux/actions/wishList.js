// ADD TO WISHLIST

export const addToWishList = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToWishList",
    payload: data,
  });
  localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishList));
  return data;
};

// REMOVER TO WISHLIST

export const removeFromWishList = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromWishList",
    payload: data._id,
  });
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishList.wishList));
  return data;
};

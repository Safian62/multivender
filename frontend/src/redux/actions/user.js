import axios from "axios";
import { server } from "../../server";

// LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data.message || "Some thing went wrong",
    });
  }
};

// LOAD SHOP
export const loadShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data.message || "Some thing went wrong",
    });
  }
};

//UPDATDE USER DETAILS
export const updateUserInfo =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response.data.message,
      });
    }
  };

// UPDATE USER ADDRESSES

export const updateUserAddress =
  (country, province, city, address1, zipCode, address2, addressType) =>
  async (dispatch) => {
    try {
      dispatch({ type: "updateUserAddressRequest" });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        { country, province, city, address1, zipCode, address2, addressType },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User Address Updated Successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// DELETE USER ADDRESSSES

export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserAddressRequest" });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/:${id}`,

      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User Address deleted Successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// GET ALL USERS ---ADMIN
export const getAllUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersAdminRequest",
    });
    const { data } = await axios.get(`${server}/user/admin-all-Users`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllUsersAdminSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersAdminFailed",
      payload: error.response?.data.message,
    });
  }
};

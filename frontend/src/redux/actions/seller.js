import axios from "axios";
import { server } from "../../server";


// GET ALL SELLERS ---ADMIN
export const getAllSellersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersAdminRequest",
    });
    const { data } = await axios.get(`${server}/shop/admin-all-sellers`,{withCredentials:true});
    dispatch({
      type: "getAllSellersAdminSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellersAdminFailed",
      payload: error.response?.data.message,
    });
  }
};

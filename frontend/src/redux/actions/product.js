import axios from "axios";
import { server } from "../../server";

// CREATE PRODUCT
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// GET ALL PRODUCTS OF SHOP

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response?.data.message,
    });
  }
};

// DELETE A PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    await axios.delete(`${server}/product/delete-shop-product/${id}`, {
      withCredentials: true,
    });

    // Id payload me bhejo, taake reducer array filter kare
    dispatch({
      type: "deleteProductSuccess",
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// GET ALL PRODUCTS

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductRequest",
    });
    const { data } = await axios.get(`${server}/product/get-all-products`);

    dispatch({
      type: "getAllProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductFailed",
      payload: error.response?.data.message,
    });
  }
};



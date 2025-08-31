import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard.jsx";
import { backend_url } from "../../../server.js";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/actions/wishList.js";
import { addToCart } from "../../../redux/actions/cart.js";
import { toast } from "react-toastify";
import Rating from "../../Products/rating.jsx";

const ProductCard = ({ data, isEvent }) => {
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);

  // Safe access with optional chaining and default values
  const imageUrl = data?.images?.[0] ? `${backend_url}/${data.images[0]}` : "";
  const shopName = data?.shop?.name || "Unknown Shop";
  const dispatch = useDispatch();

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };
  const addToWishListHandler = (data) => {
    setClick(!click);

    dispatch(addToWishList(data));
  };
  const addToCartHandle = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item Add to cart Successfully");
      }
    }
  };

  return (
    <>
      <div className="w-[200px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer h-auto sm:h-[280px] md:h-[300px] lg:h-[330px]">
        <div className="flex justify-end"></div>

        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true `
              : `/product/${data._id}`
          }`}
        >
          <img
            src={imageUrl}
            alt={data?.name || "Product"}
            className="w-full h-[170px] object-contain"
          />
        </Link>

        <Link to={`/shop/preview/${data?.shop?._id}`}>
          <h5 className={`${styles.shop_name}`}>{shopName}</h5>
        </Link>

        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true `
              : `/product/${data._id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {data?.name?.length > 40
              ? data.name.slice(0, 40) + "..."
              : data?.name || "No Name"}
          </h4>

          <div className="flex">
            <Rating rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data?.discountPrice + "$"}
              </h5>

              <h6 className={`${styles.price}`}>
                {" "}
                {data?.originalPrice + "$"}
              </h6>
            </div>

            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* SIDE OPTIONS */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishListHandler(data)}
              color="red"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishListHandler(data)}
              color="#333"
              title="Add to wishlist"
            />
          )}

          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => {
              console.log("Quick view clicked!", data._id);
              setOpen(true);
            }}
            color="#333"
            title="Quick view"
          />

          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandle(data._id)}
            color="#444"
            title="Add to cart"
          />

          {open && <ProductDetailCard setOpen={setOpen} data={data} />}
        </div>
      </div>
    </>
  );
};

export default ProductCard;

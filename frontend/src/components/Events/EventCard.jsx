import React from "react";
import styles from "../../styles/style";
import CountDown from "../CountDown";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const imageUrl = data?.images?.[0]
    ? `${backend_url}/${data.images[0]}`
    : "/placeholder.png";

  const addtoCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
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
    <div className="w-full flex justify-center">
      <div
        className={`w-[95%] lg:w-[90%] flex flex-col lg:flex-row justify-between items-start m-4 bg-white rounded-lg ${
          active ? "" : "mb-4"
        } p-4`}
      >
        {/* Image Section */}
        <div className="w-full lg:w-[50%] flex justify-center items-center">
          <img
            src={imageUrl}
            alt={data?.name}
            className="max-h-[300px] lg:max-h-[450px] object-contain"
          />
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center mt-4 lg:mt-0 lg:pl-6">
          <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
          <p className="text-sm md:text-base leading-relaxed">
            {data?.description}
          </p>

          {/* Price + Sold Info */}
          <div className="flex flex-wrap py-3 justify-between items-center">
            <div className="flex items-center space-x-2">
              <h5 className="font-medium text-[16px] md:text-[18px] text-[#d55b45] line-through">
                {data?.originalPrice}
              </h5>
              <h5 className="font-bold text-[18px] md:text-[22px] text-[#333] font-Roboto">
                {data?.discountPrice}
              </h5>
            </div>
            <span className="text-[15px] md:text-[17px] text-[#44a55e]">
              120 sold
            </span>
          </div>

          {/* Countdown */}
          <CountDown data={data} />
          <br />

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link to={`/product/${data?._id}?isEvent=true`}>
              <div className={`${styles.button} text-white px-5 py-2`}>
                See Details
              </div>
            </Link>
            <div
              className={`${styles.button} text-white px-5 py-2`}
              onClick={() => addtoCartHandler(data)}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

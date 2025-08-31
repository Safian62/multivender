import React, { useEffect, useState } from "react";
import styles from "../styles/style";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUser } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  // Fetch orders for the user
  useEffect(() => {
    if (user?._id) dispatch(getAllOrdersUser(user._id));
  }, [dispatch, user]);

  const data = orders?.find((item) => item._id === id);

  // Disable background scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // Review submit handler
  const reviewHandler = async () => {
    console.log("Sending productId:", selectedItem.productId);

    if (!selectedItem || rating < 1) return;
    try {
      await axios.put(
        `${server}/product/create-new-review`,
        {
          rating,
          comment,
          productId: selectedItem._id,
          orderId: data._id,
        },
        { withCredentials: true }
      );
      toast.success("Reviewed successfully!");
      if (user?._id) dispatch(getAllOrdersUser(user._id));

      setOpen(false);
      setComment("");
      setRating(1);

      // Refresh orders after review
      dispatch(getAllOrdersUser(user._id));
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((resp) => {
        toast.success(resp.data.message);
        dispatch(getAllOrdersUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={20} color="crimson" />
          <h1 className="ml-2 text-xl">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000075]">
          Order Id: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000075]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* Order Items */}
      {data?.cart?.map((item) => (
        <div key={item._id} className="w-full flex items-start mb-5">
          <img
            src={`${backend_url}/${item.images?.[0]}`}
            alt={item.name}
            className="w-[80px] h-[80px]"
          />
          <div className="w-full">
            <h5 className="pl-3 text-[22px]">{item.name}</h5>
            <h5 className="pl-3 text-[20px] text-[#0000007c]">
              US$ {item.discountPrice} x {item.qty}
            </h5>
          </div>

          {/* Show review button only for delivered & not yet reviewed */}
          {data?.orderStatus === "Delivered" && !item.isReviewed && (
            <div
              className={`${styles.button} text-white mt-4`}
              onClick={() => {
                setOpen(true);
                setSelectedItem(item);
              }}
            >
              Write a review
            </div>
          )}
        </div>
      ))}

      {/* Review Popup */}
      {open && selectedItem && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000083] flex items-center justify-center z-50">
          <div className="w-[45%] bg-white rounded-md shadow p-5 relative">
            <RxCross1
              size={30}
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <h2 className="text-2xl text-center font-semibold mb-4">
              Give a review
            </h2>

            <div className="flex items-center mb-3">
              <img
                src={`${backend_url}/${selectedItem?.images?.[0]}`}
                alt={selectedItem.name}
                className="w-20 h-20"
              />
              <div className="ml-3">
                <h4>{selectedItem.name}</h4>
                <p>
                  US${selectedItem.discountPrice} x {selectedItem.qty}
                </p>
              </div>
            </div>

            {/* Rating stars */}
            <h5>Give a Rating *</h5>
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="#f6ba00"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="#f6ba00"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border p-2 mb-3"
              placeholder="Write your comment (optional)"
            />

            <div
              className={`${styles.button} text-white w-full text-center`}
              onClick={reviewHandler}
            >
              Submit
            </div>
          </div>
        </div>
      )}

      {/* Total Price */}
      <div className="border-t border-black w-full text-right mt-5">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US$ {data?.totalPrice}</strong>
        </h5>
      </div>

      {/* Shipping & Payment */}
      <div className="w-full 800px:flex items-center mt-5">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress?.address1} {data?.shippingAddress?.address2}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.province}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress?.city}</h4>
        </div>

        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data.paymentInfo.status : "Not Paid"}
          </h4>
          <br />
          {data?.orderStatus === "Delivered" && (
            <div
              className={`${styles.button} text-white`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>

      <Link to="/">
        <div className={`${styles.button} text-white mt-5`}>Send Message</div>
      </Link>
      <br />
    </div>
  );
};

export default UserOrderDetails;

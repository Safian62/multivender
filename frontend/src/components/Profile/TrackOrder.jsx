import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (user?._id) dispatch(getAllOrdersUser(user._id));
  }, [dispatch, user]);

  const data = orders && orders.find((item) => item?._id === id);

  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <>
        {data && data?.orderStatus === "Processing" ? (
          <h1 className="text-center text-[20px]">
            Your order is in processing.
          </h1>
        ) : data && data?.orderStatus === "Transferred to delivery partner" ? (
          <h1 className="text-center text-[20px]">Your Order is on the way</h1>
        ) : data && data.orderStatus === "Shipping" ? (
          <h1 className="text-center text-[20px]">
            Your Order is coming through delivery person
          </h1>
        ) : data && data.orderStatus === "Received" ? (
          <h1 className="text-center text-[20px]">
            Your Order is in your city. Our delivery man will deliver it.
          </h1>
        ) : data && data.orderStatus === "On the way" ? (
          <h1 className="text-center text-[20px]">
            Our delivery man is going to deliver your order
          </h1>
        ) : data && data.orderStatus === "Delivered" ? (
          <h1 className="text-center text-[20px]">
            Your order is in your hands
          </h1>
        ) : data && data.orderStatus === "Processing refund" ? (
          <h1 className="text-center text-[20px]">Your refund is processing</h1>
        ) : data && data.orderStatus === "Refund success" ? (
          <h1 className="text-center text-[20px]">Your refund is Success</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;

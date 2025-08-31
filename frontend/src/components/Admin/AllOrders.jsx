import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdmin } from "../../redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/style";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const { adminOrders } = useSelector((state) => state.order);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/order/delete-order/${id}`, { withCredentials: true })
      .then((resp) => {
        toast.success(resp.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    dispatch(getAllOrdersAdmin());
  };

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "orderStatus",
      headerName: "status",
      minWidth: 130,
      flex: 0.7,

      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "ItemsQty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const rows = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$" + item.totalPrice,
        orderStatus: item.orderStatus,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[95%] mt-4">
        <h3 className="text-[22px] font-Poppins pb-2">All Orders</h3>

        <div className="w-full min-h-[45vh] bg-white">
          <div style={{ minWidth: "800px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
          {open && (
            <div className="w-full fixed top-0 left-0 z-30 bg-[#00000062] flex items-center justify-center h-screen">
              <div className=" w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                <div className="w-full flex justify-end cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpen(false)} />
                </div>
                <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000ac]">
                  Are you sure you want to delete!
                </h3>
                <div className="w-full flex items-center justify-center">
                  <div
                    className={`${styles.button} text-white text-[20px] !h-[40px] mr-4`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} text-white text-[20px] !h-[40px] ml-4 `}
                    onClick={() => setOpen(false) || handleDelete(orderId)}
                  >
                    Confirm
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;

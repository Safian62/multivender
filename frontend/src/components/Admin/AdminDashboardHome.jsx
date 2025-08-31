import React, { useEffect } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineMoneyCollect,
  AiOutlineOrderedList,
  AiOutlineProduct,
} from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrdersAdmin } from "../../redux/actions/order";
import { getAllSellersAdmin } from "../../redux/actions/seller";

const AdminDashboardHome = () => {
  const { adminOrders } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  console.log(adminOrders);
  useEffect(() => {
    dispatch(getAllOrdersAdmin());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(getAllSellersAdmin());
    // eslint-disable-next-line
  }, []);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = adminEarning.toFixed(2);

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

        total: item.totalPrice + "$",
        orderStatus: item.orderStatus,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full p-4">
      <h1 className="text-[22px] font-Poppins pb-2">Overview</h1>
      <div className="w-full block 800px:flex items-center justify-between">
        {/*WITHDRAW MONEY */}
        <div className="w-full mb-4 800px:w-[32%] h-[150px] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#0000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 font-[400] text-[#00000085]`}
            >
              Total Earning
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${adminBalance}
          </h5>
        </div>
        {/* ALL Sellers */}
        <div className="w-full mb-4 800px:w-[32%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineProduct size={30} className="mr-2" fill="#0000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 font-[400] text-[#00000085]`}
            >
              All Sellers
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {sellers?.length}
          </h5>
          <Link to="/admin-sellers">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
          </Link>
        </div>
        {/* ALL ORDERS */}
        <div className="w-full mb-4 800px:w-[32%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineOrderedList size={30} className="mr-2" fill="#0000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {adminOrders?.length}
          </h5>
          <Link to="/admin-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
      </div>
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>

      <div className="w-[90%] mx-8 pt-1 mt-10 bg-white rounded-lg shadow overflow-x-auto">
        <div style={{ minWidth: "800px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

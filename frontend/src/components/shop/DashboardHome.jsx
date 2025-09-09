import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineMoneyCollect,
  AiOutlineOrderedList,
  AiOutlineProduct,
} from "react-icons/ai";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrdersShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHome = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller?._id));
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "orderStatus",
      headerName: "status",
      minWidth: 130,
      flex: 0.7,
      // fix: should be cellClassName, not callClassName
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty", // fix: use camelCase consistently
      headerName: "ItemsQty",
      type: "number", // fix: use lowercase 'number'
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number", // fix: lowercase
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "actions", // fix: empty field name replaced with 'actions'
      headerName: "",
      type: "number",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$" + item.totalPrice,
        orderStatus: item.orderStatus,
      });
    });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        {/*WITHDRAW MONEY */}
        <div className="w-full mb-4 800px:w-[32%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#0000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 font-[400] text-[#00000085]`}
            >
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            ${availableBalance}
          </h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>
        {/* ALL ORDERS */}
        <div className="w-full mb-4 800px:w-[32%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineProduct size={30} className="mr-2" fill="#0000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders?.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>
        {/* ALL PRODUCTS */}
        <div className="w-full mb-4 800px:w-[32%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineOrderedList size={30} className="mr-2" fill="#0000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products?.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>

      <div className="w-[90%] mx-8 pt-1 mt-10 bg-white rounded-lg shadow overflow-x-auto">
        <div style={{ minWidth: "800px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

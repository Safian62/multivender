import React from "react";
import { RxDashboard } from "react-icons/rx";
import { FiPackage } from "react-icons/fi";
import { CiMoneyBill } from "react-icons/ci";
import { HiOutlineShoppingBag, HiOutlineUserGroup } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

const AdminSideBar = ({ active }) => {
  return (
    <div className="h-[86vh] w-full bg-white shadow-sm sticky top-0 left-0 z-10">
      {/* DASH BOARD ICON*/}
      <div className="w-full flex items-center p-3 pt-5">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400 ] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      {/* ALL SHOPS ICON*/}
      <div className="w-full flex items-center p-3.5">
        <Link to="/admin-sellers" className="w-full flex items-center">
          <BsShop size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400 ] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Shops
          </h5>
        </Link>
      </div>
      {/* ALL USERS ICON*/}
      <div className="w-full flex items-center p-3.5">
        <Link to="/admin-users" className="w-full flex items-center">
          <HiOutlineUserGroup
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400 ] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>
      {/* ALL PRODUCTS ICON*/}
      <div className="w-full flex items-center p-3.5">
        <Link to="/admin-products" className="w-full flex items-center">
          <HiOutlineShoppingBag
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400 ] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>
      {/* ALL ORDERS ICON*/}
      <div className="w-full flex items-center p-3.5">
        <Link to="/admin-orders" className="w-full flex items-center">
          <FiPackage size={30} color={`${active === 5 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400 ] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>
      {/* ALL EVENTS ICON*/}
      <div className="w-full flex items-center p-3.5">
        <Link to="/admin-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400 ] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>
      {/* WIDRAW MONEY  ICON*/}
      <div className="w-full flex items-center p-3.5">
        <Link to="/admin-withdraw-request" className="w-full flex items-center">
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400 ] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>
      {/* SETTINGS  ICON*/}
      <div className="w-full flex items-center p-3.5">
        <Link to="/admin-settings" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400 ] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;

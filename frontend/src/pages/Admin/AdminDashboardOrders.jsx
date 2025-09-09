import React from "react";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AllOrders from "../../components/Admin/AllOrders";
const AdminDashboardOrders = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[280px] h-[calc(100vh-80px)] sticky top-[80px] left-0 bg-white shadow-md">
          <AdminSideBar active={5} />
        </div>
        <AllOrders />
      </div>
    </div>
  );
};

export default AdminDashboardOrders;

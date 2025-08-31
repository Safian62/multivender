import React from "react";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AllProducts from "../../components/Admin/AllProducts";

const AdminDashboardProducts = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[280px] h-[calc(100vh-80px)] sticky top-[80px] left-0 bg-white shadow-md">
          <AdminSideBar active={4} />
        </div>
        <AllProducts />
      </div>
    </div>
  );
};

export default AdminDashboardProducts;

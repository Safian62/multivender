import React from "react";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSideBar from '../../components/Admin/AdminSideBar.jsx'
import AdminDashboardHome from '../../components/Admin/AdminDashboardHome'
const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader /> 
        <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[280px] h-[calc(100vh-80px)] sticky top-[80px] left-0 bg-white shadow-md">
          <AdminSideBar active={1} />
        </div>
        <AdminDashboardHome/>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

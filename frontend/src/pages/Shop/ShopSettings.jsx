import React from "react";
import DashboardHeader from "../../components/shop/Layout/DashboardHeader";
import ShopSettingComp from "../../components/shop/ShopSettingComp";
import DashboardSideBar from "../../components/shop/Layout/DashboardSideBar.jsx";

const ShopSettings = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[280px] h-[calc(100vh-80px)] sticky top-[80px] left-0 bg-white shadow-md">
          <DashboardSideBar active={11} />
        </div>
        <ShopSettingComp />
      </div>
    </div>
  );
};

export default ShopSettings;

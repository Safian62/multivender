import React from "react";
import DashboardHeader from "../../components/shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/Layout/DashboardSideBar";
import DashboardWithdrawMoney from "../../components/shop/DashboardWithdrawMoney";

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[280px] h-[calc(100vh-80px)] sticky top-[80px] left-0 bg-white shadow-md">
          <DashboardSideBar active={7} />
        </div>
        <DashboardWithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;

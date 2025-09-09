import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/shop/Layout/DashboardSideBar'
import Allcoupons from '../../components/shop/Layout/AllCupons'
const ShopAllcoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className=" w-[80px]  800px:w-[280px] ">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <Allcoupons/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllcoupons

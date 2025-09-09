import React from "react";
import styles from "../../styles/style";
import ShopInfo from "../../components/shop/ShopInfo";
import ShopProfileData from "../../components/shop/ShopProfileData";
const ShopHomePage = () => {
  return (
    <div className={`${styles.section}`}>
      <div className="w-full flex flex-col 800px:flex 800px:flex-row pt-10 justify-between items-start">
        {/* Sticky column */}
        <div className="w-full 800px:w-[30%] bg-white rounded-md overflow-y-scroll h-[95vh] shadow-sm 800px:sticky top-10">
          <ShopInfo isOwner={true} />
        </div>

        {/* Scrollable content */}
        <div className="w-full 800px:w-[72%] min-h-screen rounded-md">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;

import React from 'react'
import styles from '../../styles/style'
import ShopInfo from '../../components/shop/ShopInfo' 
import ShopProfileData from '../../components/shop/ShopProfileData'
import Header from '../../components/layout/Header'
const ShopPreviewPage = () => {
  return (
<>
    <Header/>
   <div className={`${styles.section}`}>
   
  <div className="w-full flex pt-10 justify-between items-start">
    {/* Sticky column */}
    <div className="w-[30%] bg-white rounded-md overflow-y-scroll h-[95vh] shadow-sm sticky top-10">
      <ShopInfo isOwner={false}/>
    </div> 

    {/* Scrollable content */}
    <div className="w-[72%] ml-3 min-h-screen rounded-md">
      <ShopProfileData isOwner={false}/>
    </div>
  </div>
</div></>
  )
}

export default ShopPreviewPage

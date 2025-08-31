// src/components/ShopRouteWrapper.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ShopHomePage from "../pages/Shop/ShopHomePage";
import ShopPreviewPage from "../pages/Shop/ShopPreviewPage";

const ShopRouteWrapper = ({ isSeller }) => {
  const { id } = useParams();

  // If the logged-in user is the seller of this shop, show ShopHomePage
  if (isSeller) {
    return <ShopHomePage />;
  }

  // Otherwise, show normal preview page
  return <ShopPreviewPage />;
};

export default ShopRouteWrapper;

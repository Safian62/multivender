import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRout from "./protectedRout/ProtectedRout.js";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FaqPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderSuccessPage,
  CheckoutPage,
  PaymentPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox,
} from "./protectedRout/Routes.js";
import {
  ShopDashboardPage,
  ShopHomePage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllcoupons,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettings,
  ShopWithdrawMoneyPage,
  ShopInboxPage,
} from "./protectedRout/ShopRout.js";
import {
  AdminDashboardPage,
  AdminDashboardUsers,
  AdminDashboardSellers,
  AdminDashboardProducts,
  AdminDashboardOrders,
  AdminDashboardEvents,
  AdminDashboardWithdraw,
} from "./protectedRout/AdminRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user.js";
import { loadShop } from "./redux/actions/user.js";

import SellerProtectedRout from "./protectedRout/SellerProtecredRout.js";
import { getAllEvents } from "./redux/actions/event.js";
import { getAllProducts } from "./redux/actions/product.js";
import ShopPreviewPage from "./pages/Shop/ShopPreviewPage.jsx";
import axios from "axios";
import { server } from "./server.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedAdminRoute from "./protectedRout/AdminProtectedRoute.js";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);

  return (
    <>
      <BrowserRouter>
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRout>
                    <PaymentPage />
                  </ProtectedRout>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRout>
                <CheckoutPage />
              </ProtectedRout>
            }
          />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRout>
                <ProfilePage />
              </ProtectedRout>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRout>
                <UserInbox />
              </ProtectedRout>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRout>
                <OrderDetailsPage />
              </ProtectedRout>
            }
          />
          {/* SHOP ROUTE */}
          <Route path="/shop-create" element={<ShopCreatePage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />

          <Route path="/shop/:id" element={<ShopHomePage />} />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />

          <Route
            path="/dashboard"
            element={
              <SellerProtectedRout>
                <ShopDashboardPage />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRout>
                <ShopSettings />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRout>
                <ShopOrderDetails />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/user/track/order/:id"
            element={
              <protectedRout>
                <TrackOrderPage />
              </protectedRout>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRout>
                <ShopCreateProduct />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRout>
                <ShopAllProducts />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRout>
                <ShopAllOrders />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRout>
                <ShopAllRefunds />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRout>
                <ShopCreateEvents />
              </SellerProtectedRout>
            }
          />

          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRout>
                <ShopAllEvents />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRout>
                <ShopAllcoupons />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRout>
                <ShopInboxPage />
              </SellerProtectedRout>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRout>
                <ShopWithdrawMoneyPage />
              </SellerProtectedRout>
            }
          />

          {/* ROUTES ONLY FOR ----ADMIN */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardUsers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-sellers"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardSellers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-products"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardProducts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-orders"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardOrders />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-events"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardEvents />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-withdraw-request"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardWithdraw />
              </ProtectedAdminRoute>
            }
          />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;

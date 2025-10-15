import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ShoppingCart from "../pages/ShoppingCart";
import CheckoutPage from "../pages/CheckoutPage";
import ConfirmationModal from "../pages/ConfirmationModal";
import AdminLogin from "../pages/admin/AdminLogin";
import OrderManagement from "../pages/admin/OrderManagement";
import ViewOrder from "../pages/admin/ViewOrder";
import MyOrders from "../pages/MyOrders";

const Layout = () => {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/shopping-cart/:id" element={<ShoppingCart />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/my-order" element={<MyOrders />} />
        <Route path="/thanku" element={<ConfirmationModal />} />

        {/* Admin Login */}
        <Route path="/salesbro" element={<AdminLogin   />} />

        {/* Protected Routes */}
        <Route
          path="/orders"
          element={<OrderManagement />}
        />
        <Route
          path="/orders/:id"
          element={<ViewOrder />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;

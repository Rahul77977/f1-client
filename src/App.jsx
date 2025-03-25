import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import { Logout } from "./pages/Logout";
import Users from "./pages/Admin/Users";
import CreateProduct from "./pages/Admin/CreateProduct";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Profile from "./pages/Profile";
import HomeDash from "./pages/Admin/HomeDash";
// import ErrorPage from "./pages/ErrorPage";
import Searcher from "./components/Searcher";
import UserRoute from "./components/UserRoute";
import ProductDetail from "./pages/ProductDetail";
import CreateCategory from "./pages/Admin/Createcategory";
import AdminRoute from "./pages/AdminRoute";
import Category from "./pages/Category";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import Charts from "./pages/Admin/Charts";
import Login from "./pages/Login"; // Ensure this is your custom Login component.
import OrdersPage from "./pages/OrdersPage";
import AdminOrders from "./pages/Adminorders";
import OrderDetailPage from "./pages/OrderDetailPage";
import UploadBannerImages from "./pages/Admin/UploadBannerImages";
import Car from "./pages/Admin/Car";
import ForgotPass from "./pages/ForgotPass";
import HomeProduct from "./pages/HomeProduct";
import SplashScreen from "./components/Splashscreen";
import { useEffect, useState } from "react";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
// import Register from "./pages/Register";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate splash screen loading for 2 seconds.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searcher" element={<Searcher />} />
        <Route path="/product" element={<HomeProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/forgot" element={<ForgotPass />} />

        {/* User Dashboard */}
        <Route path="/userdash/*" element={<UserRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        <Route path="/admin/*" element={<AdminRoute />}>
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />
          <Route path="product" element={<Product />} />
          <Route path="homedash" element={<HomeDash />} />
          <Route path="charts" element={<Charts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="Banner" element={<UploadBannerImages />} />
          <Route path="car" element={<Car />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

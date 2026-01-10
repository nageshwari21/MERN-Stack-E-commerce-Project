import { Routes, Route } from "react-router-dom";

/* Public */
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";

/* Auth */
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";

/* User */
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";

/* Admin */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import User from "./pages/Admin/User";
import AdminOrders from "./pages/Admin/AdminOrders";   // ✅ correct file

/* Guards */
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />

      {/* AUTH */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* USER DASHBOARD */}
      <Route path="/dashboard/user" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* ADMIN DASHBOARD */}
      <Route path="/dashboard/admin" element={<AdminRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="products" element={<Products />} />
        <Route path="update-product/:id" element={<UpdateProduct />} />
        <Route path="users" element={<User />} />

        {/* 🆕 ADMIN ORDERS */}
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;

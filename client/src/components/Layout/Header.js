// src/components/Layout/Header.jsx
import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { Badge } from "antd";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <GiShoppingBag size={30} />
          Ecommerce App
        </Link>

        <div className="mx-auto" style={{ width: "40%" }}>
          <SearchInput />
        </div>

        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              Categories
            </span>
            <ul className="dropdown-menu">
              {categories?.map((c) => (
                <li key={c._id}>
                  <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="nav-item">
            <NavLink to="/cart" className="nav-link">
              <Badge count={cart?.length} showZero>
                🛒 Cart
              </Badge>
            </NavLink>
          </li>

          {!auth?.user ? (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  to={
                    Number(auth?.user?.role) === 1
                      ? "/dashboard/admin"
                      : "/dashboard/user"
                  }
                  className="nav-link"
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <span className="nav-link fw-bold">
                  {auth?.user?.name}
                </span>
              </li>

              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="nav-link btn btn-link text-danger"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

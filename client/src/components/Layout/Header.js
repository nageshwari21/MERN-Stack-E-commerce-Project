import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory"; // ✅ ADD THIS

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const categories = useCategory(); // ✅ USE HOOK

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <GiShoppingBag size={30} />
          Ecommerce App
        </Link>

        {/* 🔍 SEARCH INPUT */}
        <div className="mx-auto" style={{ width: "40%" }}>
          <SearchInput />
        </div>

        {/* NAV LINKS */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>

          {/* ✅ CATEGORY DROPDOWN */}
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
            >
              Categories
            </span>

            <ul className="dropdown-menu">
              {categories.length === 0 && (
                <li className="dropdown-item text-muted">
                  No Categories
                </li>
              )}

              {categories.map((c) => (
                <li key={c._id}>
                  <Link
                    className="dropdown-item"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
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
                {auth.user.role === 1 ? (
                  <NavLink to="/dashboard/admin" className="nav-link">
                    Admin Dashboard
                  </NavLink>
                ) : (
                  <NavLink to="/dashboard/user" className="nav-link">
                    Dashboard
                  </NavLink>
                )}
              </li>

              <li className="nav-item">
                <span className="nav-link fw-bold">
                  {auth.user.name}
                  {auth.user.role === 1 && (
                    <span className="badge bg-danger ms-1">Admin</span>
                  )}
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

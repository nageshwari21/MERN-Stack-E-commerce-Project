import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

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

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/category" className="nav-link">Category</NavLink>
          </li>

          {!auth?.user && (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
            </>
          )}

          {auth?.user && (
            <>
              <li className="nav-item">
                <NavLink to="/dashboard/user" className="nav-link">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <span className="nav-link fw-bold">{auth.user.name}</span>
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

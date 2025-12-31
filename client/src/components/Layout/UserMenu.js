// src/components/Layout/UserMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action ${
      isActive ? "active" : ""
    }`;

  return (
    <div className="list-group">
      <NavLink
        to="/dashboard/user"
        end
        className={linkClass}
      >
        🏠 Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/user/profile"
        className={linkClass}
      >
        👤 Profile
      </NavLink>

      <NavLink
        to="/dashboard/user/orders"
        className={linkClass}
      >
        📦 Orders
      </NavLink>
    </div>
  );
};

export default UserMenu;

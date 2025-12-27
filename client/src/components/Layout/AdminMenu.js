import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action ${isActive ? "active" : ""}`;

  return (
    <div className="list-group">
      {/* Admin Dashboard */}
      <NavLink to="/dashboard/admin" end className={linkClass}>
        Admin Dashboard
      </NavLink>

      {/* Create Category */}
      <NavLink to="/dashboard/admin/create-category" className={linkClass}>
        Create Category
      </NavLink>

      {/* Create Product */}
      <NavLink to="/dashboard/admin/create-product" className={linkClass}>
        Create Product
      </NavLink>

      {/* Users */}
      <NavLink to="/dashboard/admin/users" className={linkClass}>
        Users
      </NavLink>

      {/* Disabled */}
      <span className="list-group-item disabled">
        Orders (Coming Soon)
      </span>
    </div>
  );
};

export default AdminMenu;

import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action ${
      isActive ? "active" : ""
    }`;

  return (
    <div className="card shadow-sm">
      <h4 className="text-center p-3 bg-dark text-white mb-0">
        Admin Panel
      </h4>

      <div className="list-group list-group-flush">
        {/* Admin Dashboard */}
        <NavLink
          to="/dashboard/admin"
          end
          className={linkClass}
        >
          📊 Admin Dashboard
        </NavLink>

        {/* Create Category */}
        <NavLink
          to="/dashboard/admin/create-category"
          className={linkClass}
        >
          ➕ Create Category
        </NavLink>

        {/* Create Product */}
        <NavLink
          to="/dashboard/admin/create-product"
          className={linkClass}
        >
          ➕ Create Product
        </NavLink>

        {/* All Products */}
        <NavLink
          to="/dashboard/admin/products"
          className={linkClass}
        >
          📦 Products
        </NavLink>

        {/* Users */}
        <NavLink
          to="/dashboard/admin/users"
          className={linkClass}
        >
          👤 Users
        </NavLink>

        {/* Disabled / Coming Soon */}
        <span className="list-group-item disabled text-muted">
          🧾 Orders (Coming Soon)
        </span>
      </div>
    </div>
  );
};

export default AdminMenu;

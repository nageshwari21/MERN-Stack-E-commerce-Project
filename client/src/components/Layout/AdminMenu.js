import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const linkClass = ({ isActive }) =>
    `list-group-item list-group-item-action ${isActive ? "active" : ""}`;

  return (
    <div className="card shadow-sm">
      <h4 className="text-center p-3 bg-dark text-white mb-0">
        Admin Panel
      </h4>

      <div className="list-group list-group-flush">
        <NavLink to="/dashboard/admin" end className={linkClass}>
          📊 Admin Dashboard
        </NavLink>

        <NavLink to="/dashboard/admin/create-category" className={linkClass}>
          ➕ Create Category
        </NavLink>

        <NavLink to="/dashboard/admin/create-product" className={linkClass}>
          ➕ Create Product
        </NavLink>

        <NavLink to="/dashboard/admin/products" className={linkClass}>
          📦 Products
        </NavLink>

        <NavLink to="/dashboard/admin/orders" className={linkClass}>
          🧾 Orders
        </NavLink>

        <NavLink to="/dashboard/admin/users" className={linkClass}>
          👤 Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;

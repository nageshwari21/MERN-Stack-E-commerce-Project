import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Admin Dashboard">
      <div className="container-fluid mt-4">
        <h2 className="mb-2 text-center">Admin Dashboard</h2>

        {/* Welcome Message */}
        <h4 className="text-center text-muted mb-4">
          Welcome to Admin Dashboard, {auth?.user?.name} 👋
        </h4>

        <hr />

        {auth?.user ? (
          <div className="row">
            {/* LEFT SIDEBAR */}
            <div className="col-md-3">
              <AdminMenu />
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-md-9">
              <div className="card p-3 shadow">
                <h5 className="mb-3">Admin Info</h5>

                <p>
                  <strong>Name:</strong> {auth.user.name}
                </p>

                <p>
                  <strong>Email:</strong> {auth.user.email}
                </p>

                <p>
                  <strong>Role:</strong>{" "}
                  {auth.user.role === 1 ? "Admin (role: 1)" : "User"}
                </p>

                <hr />

                <h5 className="mb-3">Admin Panel</h5>
                <ul className="list-group">
                  <li className="list-group-item">📦 Manage Products</li>
                  <li className="list-group-item">👤 Manage Users</li>
                  <li className="list-group-item">🧾 Manage Orders</li>
                  <li className="list-group-item">⚙️ Website Settings</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading admin data...</p>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;

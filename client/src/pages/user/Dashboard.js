// src/pages/user/Dashboard.jsx
import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="User Dashboard">
      <div className="container-fluid mt-4">
        <div className="row">
          {/* LEFT MENU */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-md-9">
            <div className="card p-4 shadow">
              <h3 className="mb-3">User Dashboard</h3>

              <p>
                <strong>Name:</strong> {auth?.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {auth?.user?.email}
              </p>
              <p>
                <strong>Role:</strong> User
              </p>

              <hr />

              <p>Welcome to your dashboard 🎉</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

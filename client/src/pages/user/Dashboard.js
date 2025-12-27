import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="User Dashboard">
      <div className="container-fluid mt-4">
        <h2 className="text-center">User Dashboard</h2>
        <h5 className="text-center text-muted">
          Welcome, {auth?.user?.name} 👋
        </h5>

        <div className="row mt-4">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="card p-3">
              <h5>User Info</h5>
              <p><strong>Name:</strong> {auth.user.name}</p>
              <p><strong>Email:</strong> {auth.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

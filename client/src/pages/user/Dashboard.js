import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Dashboard">
      <h1>Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <p><b>Name:</b> {auth?.user?.name}</p>
        <p><b>Email:</b> {auth?.user?.email}</p>
      </div>
    </Layout>
  );
};

export default Dashboard;

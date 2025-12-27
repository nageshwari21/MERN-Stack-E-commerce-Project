import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout title="My Orders">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="card p-3">
              <h4>My Orders</h4>
              <p>No orders found yet 🛒</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

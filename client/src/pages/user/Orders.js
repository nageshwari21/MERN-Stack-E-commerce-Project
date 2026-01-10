import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders", {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // 🔥 send token
        },
      });

      if (data?.success) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="My Orders">
      <div className="container">
        <h2 className="text-center my-4">My Orders</h2>

        {orders.length === 0 && (
          <h4 className="text-center text-danger">No Orders Found</h4>
        )}

        {orders.map((order, i) => (
          <div key={order._id} className="border shadow p-3 mb-3">
            <h5>Order #{i + 1}</h5>
            <p>Status: {order.status}</p>
            <p>Buyer: {order?.buyer?.name}</p>
            <p>Date: {moment(order.createdAt).fromNow()}</p>
            <p>Payment: {order?.payment?.success ? "Success" : "Failed"}</p>

            <div className="row">
              {order.products.map((p) => (
                <div key={p._id} className="col-md-4">
                  <div className="card mb-2">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      height="200"
                    />
                    <div className="card-body">
                      <h6>{p.name}</h6>
                      <p>₹{p.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Orders;

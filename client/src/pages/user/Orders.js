import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));

      const { data } = await axios.get("/api/v1/auth/orders", {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>

            {orders?.map((o, i) => (
              <div className="border shadow mb-3" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="container">
                  {o?.products?.map((p) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : ₹{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {!orders?.length && (
              <h4 className="text-center mt-4">No orders found</h4>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

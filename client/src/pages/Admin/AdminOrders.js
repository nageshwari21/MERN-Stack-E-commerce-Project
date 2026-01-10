import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const status = ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"];

  const getOrders = async () => {
    const { data } = await axios.get("/api/v1/auth/all-orders", {
      headers: { Authorization: `Bearer ${auth?.token}` },
    });
    if (data?.success) setOrders(data.orders);
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (id, value) => {
    await axios.put(
      `/api/v1/auth/order-status/${id}`,
      { status: value },
      { headers: { Authorization: `Bearer ${auth?.token}` } }
    );
    getOrders();
  };

  return (
    <Layout title="Admin Orders">
      <div className="row">
        <div className="col-md-3"><AdminMenu /></div>
        <div className="col-md-9">
          <h2>All Orders</h2>

          {orders.map((o, i) => (
            <div key={o._id} className="border p-3 mb-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th><th>Status</th><th>Buyer</th>
                    <th>Date</th><th>Payment</th><th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select defaultValue={o.status} onChange={(v)=>handleChange(o._id,v)}>
                        {status.map(s => <Option key={s}>{s}</Option>)}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o.createdAt).fromNow()}</td>
                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                    <td>{o.products.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;

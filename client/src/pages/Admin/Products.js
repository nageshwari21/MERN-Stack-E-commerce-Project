import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    };
    getProducts();
  }, []);

  return (
    <Layout title="Products">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h3>All Products</h3>

            <div className="row">
              {products.map((p) => (
                <div key={p._id} className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      height="200"
                    />
                    <div className="card-body">
                      <h5>{p.name}</h5>
                      <p>₹ {p.price}</p>

                      {/* ✅ MUST USE _id */}
                      <Link
                        to={`/dashboard/admin/update-product/${p._id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

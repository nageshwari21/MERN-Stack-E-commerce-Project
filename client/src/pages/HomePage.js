import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // fetch products from backend
  const getAllProducts = async () => {
    try {
      const res = await axios.get("/api/v1/product/get-product");
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Home - Ecommerce App"}>
      <div className="container my-3">
        <h1 className="text-center">All Products</h1>
        <div className="row">
          {products?.map((p) => (
            <div className="col-md-4" key={p._id}>
              <div className="card m-2 p-2">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 60)}</p>
                  <p className="card-text">₹{p.price}</p>
                  <Link to={`/product/${p.slug}`} className="btn btn-primary">
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

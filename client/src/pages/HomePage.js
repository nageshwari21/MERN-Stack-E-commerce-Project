import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout/Layout";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // =========================
  // GET ALL CATEGORIES
  // =========================
  const getAllCategory = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // =========================
  // GET TOTAL PRODUCT COUNT
  // =========================
  const getTotal = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total || 0);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // =========================
  // GET PRODUCTS
  // =========================
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(data?.products || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  // =========================
  // LOAD MORE
  // =========================
  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts((prev) => [...prev, ...(data?.products || [])]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);

  // =========================
  // HANDLE CATEGORY FILTER
  // =========================
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  // =========================
  // EFFECTS
  // =========================
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, [getAllCategory, getTotal, getAllProducts]);

  // load more
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page, loadMore]);

  // filters (DO NOT call getAllProducts here)
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio, filterProduct]);

  // =========================
  // UI
  // =========================
  return (
    <Layout title="All Products - Best Offers">
      <div className="container-fluid row mt-3">

        {/* FILTER SECTION */}
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>

          {categories.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}

          <h4 className="text-center mt-4">Filter By Price</h4>

          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices.map((p) => (
              <Radio key={p._id} value={p.array}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>

          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height="200"
                />

                <div className="card-body">
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 30)}...</p>
                  <p className="fw-bold">₹ {p.price}</p>

                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>

                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      toast.success("Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length < total && (
            <button
              className="btn btn-warning mt-3"
              onClick={() => setPage(page + 1)}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const { slug } = useParams(); // ✅ use slug directly
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD PRODUCT WHEN SLUG CHANGES
  ========================= */
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `/api/v1/product/get-product/${slug}`
        );

        setProduct(data?.product);

        // load similar products
        getSimilarProduct(
          data?.product?._id,
          data?.product?.category?._id
        );

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (slug) {
      getProduct();
    }
  }, [slug]); // ✅ MOST IMPORTANT FIX

  /* =========================
     GET SIMILAR PRODUCTS
  ========================= */
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <Layout>
        <h3 className="text-center mt-5">
          Loading product details...
        </h3>
      </Layout>
    );
  }

  /* =========================
     SAFETY CHECK
  ========================= */
  if (!product) {
    return (
      <Layout>
        <h3 className="text-center mt-5">
          Product not found
        </h3>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ================= PRODUCT DETAILS ================= */}
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width="350px"
          />
        </div>

        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :{" "}
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>

          {/* ✅ FIXED className */}
          <button className="btn btn-secondary ms-1">
            ADD TO CART
          </button>
        </div>
      </div>

      <hr />

      {/* ================= SIMILAR PRODUCTS ================= */}
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>

        {relatedProducts.length === 0 && (
          <p className="text-center">
            No Similar Products found
          </p>
        )}

        <div className="d-flex flex-wrap">
          {relatedProducts.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>

                <p className="card-text">
                  {p.description.substring(0, 60)}...
                </p>

                <div className="card-name-price">
                  {/* ✅ THIS NOW WORKS 100% */}
                  <button
                    className="btn btn-info ms-1"
                    onClick={() =>
                      navigate(`/product/${p.slug}`)
                    }
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

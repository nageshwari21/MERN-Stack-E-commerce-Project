import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/v1/product/single-product/${slug}`
        );
        setProduct(data?.product);
        getSimilarProduct(data?.product?._id, data?.product?.category?._id);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (slug) getProduct();
  }, [slug]);

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

  if (loading) {
    return (
      <Layout>
        <h3 className="text-center mt-5">Loading product...</h3>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <h3 className="text-center mt-5">Product not found</h3>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="img-fluid"
          />
        </div>

        <div className="col-md-6 product-details-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>₹ {product.price}</h4>
          <h5>Category : {product?.category?.name}</h5>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>

      <hr />

      <div className="row container similar-products">
        <h4>Similar Products</h4>

        {relatedProducts.length === 0 && (
          <p>No Similar Products Found</p>
        )}

        <div className="d-flex flex-wrap">
          {relatedProducts.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>{p.description.substring(0, 50)}...</p>
                <button
                  className="btn btn-info"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

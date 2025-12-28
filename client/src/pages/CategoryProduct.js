import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const CategoryProduct = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/product-category/${slug}`
        );

        if (data?.success) {
          setProducts(data.products);
          setCategory(data.category);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProductsByCategory();
  }, [slug]);

  return (
    <Layout title={category?.name}>
      <div className="container mt-4">
        <h3 className="text-center">
          Category: {category?.name}
        </h3>

        <p className="text-center">
          {products.length} products found
        </p>

        {products.length === 0 && (
          <p className="text-center">
            No products found in this category
          </p>
        )}

        <div className="row">
          {products.map((p) => (
            <div className="col-md-3 mb-3" key={p._id}>
              <div className="card h-100">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height="200"
                />
                <div className="card-body text-center">
                  <h5>{p.name}</h5>
                  <p>₹ {p.price}</p>
                  <Link
                    to={`/product/${p.slug}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
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

export default CategoryProduct;

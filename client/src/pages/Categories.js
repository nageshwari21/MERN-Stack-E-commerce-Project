import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Categories</h2>

        {categories.length === 0 && (
          <p className="text-center">No categories found</p>
        )}

        <div className="row">
          {categories.map((c) => (
            <div className="col-md-3" key={c._id}>
              <div className="card m-2 p-2 text-center">
                <Link
                  to={`/category/${c.slug}`}
                  className="text-decoration-none text-dark"
                >
                  <h5>{c.name}</h5>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
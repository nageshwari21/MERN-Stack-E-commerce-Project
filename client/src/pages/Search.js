import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <h1>Search Results</h1>
        <h6>
          {search.results.length < 1
            ? "No Products Found"
            : `Found ${search.results.length}`}
        </h6>

        <div className="d-flex flex-wrap mt-4">
          {search.results.map((p) => (
            <div
              className="card m-2"
              style={{ width: "18rem" }}
              key={p._id}
            >
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>{p.description.substring(0, 30)}...</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/product/${p.slug}`)
                  }
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

export default Search;

import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [auth] = useAuth(); // ✅ no setAuth (prevents ESLint warning)

  return (
    <Layout title="Best Offers | Ecommerce App">
      <div className="container mt-4">
        <h1>Home Page</h1>

        {/* USER LOGGED IN */}
        {auth?.user ? (
          <div className="alert alert-success mt-3">
            <h4>Welcome, {auth.user.name} 👋</h4>
            <p>Email: {auth.user.email}</p>

            <Link to="/dashboard/user" className="btn btn-primary mt-2">
              Go to Dashboard
            </Link>
          </div>
        ) : (
          /* USER NOT LOGGED IN */
          <div className="alert alert-warning mt-3">
            <h4>Welcome to Ecommerce App</h4>
            <p>Please login or register to continue.</p>

            <Link to="/login" className="btn btn-success me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              Register
            </Link>
          </div>
        )}

        {/* DEBUG (optional – remove later) */}
        <pre className="mt-4 bg-light p-3">
          {JSON.stringify(auth, null, 2)}
        </pre>
      </div>
    </Layout>
  );
};

export default HomePage;

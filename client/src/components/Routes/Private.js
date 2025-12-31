import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "/api/v1/auth/user-auth",
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        setOk(data.ok);
      } catch (error) {
        setOk(false);
      }
    };

    if (auth?.token) checkAuth();
    else setOk(false);
  }, [auth?.token]);

  // 🔄 show loader instead of blank page
  if (ok === null) return <Spinner />;

  return ok ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

// src/components/Routes/AdminRoute.js
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get(
          "/api/v1/auth/admin-auth",
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );
        setOk(data?.ok);
      } catch (error) {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
    else setOk(false);
  }, [auth?.token]);

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return ok ? <Outlet /> : <Spinner />;
};

export default AdminRoute;

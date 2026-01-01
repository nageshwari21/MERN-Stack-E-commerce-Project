// src/components/Routes/AdminRoute.js
import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(null);
  const [auth] = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("ADMIN ROUTE TOKEN 👉", auth?.token);
    console.log("ADMIN ROUTE ROLE 👉", auth?.user?.role);

    const checkAdmin = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });

        console.log("ADMIN AUTH RESPONSE 👉", res.data);
        setOk(res.data.ok === true);
      } catch (error) {
        console.log(
          "ADMIN AUTH ERROR 👉",
          error.response?.status,
          error.response?.data
        );
        setOk(false);
      }
    };

    if (auth?.token && Number(auth?.user?.role) === 1) {
      checkAdmin();
    } else {
      console.log("ROLE CHECK FAILED OR TOKEN MISSING");
      setOk(false);
    }
  }, [auth?.token, auth?.user?.role]);

  if (ok === null) return <Spinner />;

  return ok ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={location.pathname} replace />
  );
};

export default AdminRoute;

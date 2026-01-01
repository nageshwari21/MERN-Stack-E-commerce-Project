import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(null);
  const [auth] = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/user-auth", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setOk(data.ok === true);
      } catch {
        setOk(false);
      }
    };

    if (auth?.token) checkUser();
    else setOk(false);
  }, [auth?.token]);

  if (ok === null) return <Spinner />;

  return ok ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={location.pathname} replace />
  );
};

export default PrivateRoute;

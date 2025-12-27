import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

const AdminRoute = () => {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setOk(res.data.ok);
      } catch (error) {
        setOk(false);
      }
    };

    if (auth?.token) checkAdmin();
  }, [auth?.token]);

  return ok ? <Outlet /> : null;
};

export default AdminRoute;

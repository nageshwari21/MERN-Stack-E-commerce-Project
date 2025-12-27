import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

const PrivateRoute = () => {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setOk(res.data.ok);
      } catch (err) {
        setOk(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) checkAuth();
    else setLoading(false);
  }, [auth?.token]);

  if (loading) {
    return <h3 className="text-center mt-5">Checking authentication...</h3>;
  }

  return ok ? <Outlet /> : <h3 className="text-center mt-5">Please login</h3>;
};

export default PrivateRoute;

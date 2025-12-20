import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function PrivateRoute() {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ ADD THIS
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth", {
          headers: {
            Authorization: auth?.token,
          },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
      } finally {
        setLoading(false); // ✅ IMPORTANT
      }
    };

    if (auth?.token) authCheck();
    else setLoading(false);
  }, [auth?.token]);

  // ⏳ WAIT until auth check completes
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return ok ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

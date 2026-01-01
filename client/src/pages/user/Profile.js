import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState(auth?.user?.name || "");
  const [phone, setPhone] = useState(auth?.user?.phone || "");
  const [address, setAddress] = useState(auth?.user?.address || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        "/api/v1/auth/profile",
        {
          name,
          phone,
          address,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // ✅ REQUIRED
          },
        }
      );

      if (data?.success) {
        toast.success("Profile updated");

        // 🔥 update auth context + localStorage
        const updatedAuth = {
          ...auth,
          user: data.updatedUser,
        };

        setAuth(updatedAuth);
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
      }
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    }
  };

  return (
    <Layout title="Profile">
      <div className="container mt-3">
        <h3>User Profile</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            type="text"
            className="form-control mb-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />

          <input
            type="text"
            className="form-control mb-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />

          <input
            type="password"
            className="form-control mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password (optional)"
          />

          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;

import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth] = useAuth();

  return (
    <Layout title="My Profile">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="card p-3">
              <h4>My Profile</h4>
              <p><strong>Name:</strong> {auth.user.name}</p>
              <p><strong>Email:</strong> {auth.user.email}</p>
              <p><strong>Phone:</strong> {auth.user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

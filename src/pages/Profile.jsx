import React from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../store/Auth";
import userIcon from "../assets/ca1.png"; // Your default user icon

const Profile = () => {
  const { firebaseUser, serverUser } = useAuth();

  // Combine user data as in your Navbar logic.
  const user = {
    name: serverUser?.name || firebaseUser?.displayName || "Guest",
    email: serverUser?.email || firebaseUser?.email || "",
    picture: serverUser?.picture || firebaseUser?.photoURL || userIcon,
    phoneNumber: serverUser?.phoneNumber || firebaseUser?.phoneNumber || "",
  };

  return (
    <Layout title="Your Profile">
      <div className="container-fluid m-3 p-3">
        {/* Mobile-like profile header */}
        <div className="mobile-user-profile d-flex align-items-center mb-4">
          <img
            src={user.picture}
            alt="User"
            className="mobile-user-avatar rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
            onError={(e) => {
              e.target.src = userIcon;
            }}
          />
          <div className="mobile-user-info ms-3">
            <div className="mobile-user-name h4 mb-1">{user.name}</div>
            <div className="mobile-user-email text-muted">{user.email}</div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="row">
          <div className="col-md-12">
            <div className="form-container">
              <h4 className="title">USER PROFILE DETAILS</h4>
              <div className="mb-3">
                <label>Name:</label>
                <input
                  type="text"
                  value={user.name}
                  className="form-control"
                  placeholder="Enter Your Name"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label>Email:</label>
                <input
                  type="email"
                  value={user.email}
                  className="form-control"
                  placeholder="Enter Your Email"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={user.phoneNumber}
                  className="form-control"
                  placeholder="Enter Your Phone Number"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

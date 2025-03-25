import React, { useEffect } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import googleIcon from "../assets/google.jpg";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          localStorage.setItem("authToken", token);
          navigate("/");
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      } else {
        localStorage.removeItem("authToken");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
    >
      <div
        className="p-5 bg-white shadow rounded text-center"
        style={{ 
          maxWidth: "400px", 
          width: "100%",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)"
        }}
      >
        <h2 className="mb-4" style={{ color: "#495057" }}>
          Welcome Back
        </h2>
        <button
          onClick={handleGoogleSignIn}
          className="btn d-flex align-items-center justify-content-center w-100 py-2 mb-3"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #dadce0",
            borderRadius: "4px",
            color: "#3c4043",
            fontWeight: "500",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease"
          }}
        >
          <img
            src={googleIcon}
            alt="Google"
            className="me-2"
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          Sign In with Google
        </button>
        <button 
          className="btn w-100" 
          disabled
          style={{
            backgroundColor: "#f1f3f5",
            color: "#868e96",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Mobile Login (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default Login;
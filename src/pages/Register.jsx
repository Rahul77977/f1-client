// import React, { useEffect, useState } from "react";
// import { auth, googleProvider } from "./firebase";
// import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         try {
//           const token = await currentUser.getIdToken();
//           localStorage.setItem("authToken", token); // Store token in localStorage
//           navigate("/"); // Redirect to homepage after login
//         } catch (error) {
//           console.error("Error fetching token:", error);
//         }
//       } else {
//         localStorage.removeItem("authToken"); // Remove token if user logs out
//       }
//     });
//     return () => unsubscribe();
//   }, [navigate]);

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       console.error("Error during Google sign-in:", error);
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col justify-center items-center space-y-6 p-4">
//       <button onClick={handleGoogleSignIn} className="p-3 bg-gray-400 rounded-md">
//         Sign In with Google
//       </button>
//     </div>
//   );
// };

// export default Register;

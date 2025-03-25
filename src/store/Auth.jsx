import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../pages/firebase"; // Updated firebase import
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Retrieve the token from localStorage (using "authToken" key)
  const [token, setToken] = useState(() => localStorage.getItem("authToken") || "");
  // Store the Firebase user and the server-fetched user data
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [serverUser, setServerUser] = useState(null);
  // Track whether the auth state is still loading
  const [authIsLoading, setAuthIsLoading] = useState(true);

  // Format the token for API requests (include "Bearer " prefix)
  const AuthorizationToken = `Bearer ${token}`;

  // Store token in state and localStorage
  const storeTokenInLS = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  // Logout the user by signing out from Firebase and clearing stored data
  const LogoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out from Firebase:", error);
    }
    setToken("");
    localStorage.removeItem("authToken");
    setFirebaseUser(null);
    setServerUser(null);
  };

  // Fetch the server user from your backend endpoint using the token.
  // If the fetch fails (e.g. the user is deleted), log the user out.
  const fetchServerUser = async (token) => {
    try {
      const response = await fetch("https://f1-server-1.onrender.com/api/v1/auth/googleAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setServerUser(data);
      } else {
        console.error("Failed to fetch server user data:", await response.text());
        await LogoutUser();
      }
    } catch (error) {
      console.error("Error fetching server user data:", error);
      await LogoutUser();
    }
  };

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        try {
          const newToken = await user.getIdToken();
          storeTokenInLS(newToken);
          await fetchServerUser(newToken);
        } catch (error) {
          console.error("Error retrieving token:", error);
          await LogoutUser();
        }
      } else {
        await LogoutUser();
      }
      setAuthIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Determine if the user is logged in based on the presence of a Firebase user
  const isLoggedIn = !!firebaseUser;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        firebaseUser,
        serverUser,
        token,
        AuthorizationToken,
        storeTokenInLS,
        LogoutUser,
        authIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

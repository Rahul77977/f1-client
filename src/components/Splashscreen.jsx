// src/components/SplashScreen.jsx
import React from 'react';
import logo from "../assets/dotent.jpg"
const SplashScreen = () => {
  return (
    <div className="splash-screen" style={styles.container}>
      <img src={logo} alt="Ecom Logo" style={styles.logo} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff', // Change to match your branding
  },
  logo: {
    width: '150px', // Adjust the size to fit your logo
  },
};

export default SplashScreen;

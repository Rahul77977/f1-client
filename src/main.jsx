import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // Global styles
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import 'antd/dist/reset.css';  // Ant Design CSS

// Providers
import { AuthProvider } from './store/Auth.jsx';
import { SearchProvider } from './store/Search.jsx';
import { CartProvider } from './store/UseCart.jsx';

// Hot Toast
import { Toaster } from 'react-hot-toast';

// Render application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </CartProvider> 
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);

import React, { useState } from "react";
import Layout from "../components/Layouts/Layout";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useCart } from "../store/UseCart";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const ProductCard = ({ title, price, discountedPrice, discount, rating, images }) => (
  <div className="product-card">
    {images && images.length > 0 && <img src={images[0].url} alt={title} className="product-image" />}
    <div className="product-info">
      <h3 className="product-title">{title}</h3>
      <div className="product-price">
        <span className="original-price">₹{price}</span>
        {discountedPrice && <span className="discounted-price">₹{discountedPrice}</span>}
      </div>
      {discount && <span className="discount-badge">{discount}% OFF</span>}
      <div className="product-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? "star filled" : "star"}>★</span>
        ))}
      </div>
    </div>
  </div>
);

const CartPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useAuth();
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const {AuthorizationToken}=useAuth();
  const removeItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (e, pid) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity ?? 1), 0).toFixed(2);
  };

  const handlePayment = async () => {
    if (!isLoggedIn) {
      setError("Please login first to proceed with payment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://f1-server-1.onrender.com/api/v1/product/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:AuthorizationToken,
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      if (!data.ok) throw new Error(data.message || "Payment failed!");

      alert(`Payment Successful! Order Total: ₹${data.totalAmount}`);
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/orders"); // Redirect to orders page after success
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          {isLoggedIn ? (
            <p className="cart-count">
              {cart.length > 0 ? `You have ${cart.length} item(s) in your cart` : "Your cart is empty"}
            </p>
          ) : (
            <p className="login-message">Please login first to proceed with payment.</p>
          )}
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <ProductCard
                    title={item.name}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                    discount={item.discount}
                    rating={item.rating}
                    images={item.images}
                  />
                  <div className="item-actions">
                    <input
                      type="number"
                      value={item.quantity ?? 1}
                      onChange={(e) => handleQuantityChange(e, item._id)}
                      min="1"
                      className="quantity-input"
                    />
                    <button onClick={() => removeItem(item._id)} className="remove-button">Remove</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-cart">
                <i className="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button className="continue-shopping" onClick={() => navigate("/")}>Continue Shopping</button>
              </div>
            )}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>

            <Button className="pay-button" onClick={handlePayment} disabled={loading || cart.length === 0}>
              {loading ? <CircularProgress size={24} /> : "Proceed to Checkout"}
            </Button>
            {!isLoggedIn && <Typography color="error" variant="body2" sx={{ mt: 1 }}>Please login first to proceed with payment.</Typography>}
            {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
          </div>
        </div>
      </div>  
    </Layout>
  );
};

export default CartPage;

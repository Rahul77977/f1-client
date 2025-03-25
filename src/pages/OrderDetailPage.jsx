import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layouts/Layout';
import { useAuth } from '../store/Auth';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { AuthorizationToken, authIsLoading } = useAuth();

  useEffect(() => {
    if (authIsLoading) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://f1-server-1.onrender.com/api/v1/auth/orders/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: AuthorizationToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await response.json();
        setOrder(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [AuthorizationToken, authIsLoading, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (authIsLoading || loading) {
    return (
      <Layout>
        <div className="order-detail-container">
          <Skeleton height={40} />
          <Skeleton height={200} />
          <Skeleton height={50} count={3} />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="order-detail-container">
          <p className="error-title">Error: {error}</p>
          <button onClick={handleGoBack} className="go-back-btn">Go Back</button>
        </div>
      </Layout>
    );
  }

  if (!order || !order.products || order.products.length === 0) {
    return (
      <Layout>
        <div className="order-detail-container">
          <p className="not-found-title">Order not found or contains no products</p>
          <button onClick={handleGoBack} className="go-back-btn">Go Back</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="order-detail-container">
        <h1 className="page-title">Order Details</h1>
        <h2 className="order-id">Order ID: {order._id}</h2>
        <div className="order-info-grid">
          <p><strong>Buyer:</strong> {order.buyer && order.buyer.name ? order.buyer.name : "Unknown"}</p>
          <p><strong>Created At:</strong> {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p><strong>Payment Status:</strong> {order.payment && order.payment.status ? order.payment.status : "Unknown"}</p>
          <p><strong>Total Quantity:</strong> {order.products.length}</p>
        </div>
        <h3>Products</h3>
        <div className="products-list">
          {order.products.map((item, index) => {
            if (!item || !item.product) {
              return (
                <div key={index} className="product-item">
                  <p className="error-text">Product details not available</p>
                </div>
              );
            }

            const product = item.product;
            return (
              <div key={product._id ? product._id : index} className="product-item">
                <div className="product-image">
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0].url : "https://via.placeholder.com/150"}
                    alt={product.name ? product.name : "Unknown Product"}
                    className="product-img"
                  />
                </div>
                <div className="product-details">
                  <h4>{product.name ? product.name : "Unknown Product"}</h4>
                  <p>{product.description ? product.description : "No description available"}</p>
                  <p>₹{product.price ? product.price.toFixed(2) : "N/A"}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={handleGoBack} className="go-back-btn">Go Back</button>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;

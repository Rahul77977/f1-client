import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { MdShoppingBag } from 'react-icons/md';
import { GiStarsStack } from 'react-icons/gi';

const CardsDashboard = () => {
  // State for storing fetched stats, error and loading state.
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTotalCounts = async () => {
    try {
      const response = await fetch('https://f1-server-1.onrender.com/api/v1/auth/total-counts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Uncomment and add your token if needed:
          // 'Authorization': 'Bearer <your_jwt_token>',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        // Map the API response to our stats structure.
        setStats({
          users: { count: data.totalUsers, isIncrease: true },
          orders: { count: data.totalOrders, isIncrease: true },
          products: { count: data.totalProducts, isIncrease: true },
          sales: { count: data.totalSales, isIncrease: false },
        });
      } else {
        setError(data.message || 'Failed to fetch stats');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Error fetching stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotalCounts();
  }, []);

  // A reusable Card component for each statistic.
  const Card = ({ title, count, icon, isIncrease }) => (
    <div
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{ fontSize: '2.5rem', color: '#6366F1' }}>{icon}</div>
      <div>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardCount}>{count}</p>
        <p style={{ ...styles.cardChange, color: isIncrease ? '#4CAF50' : '#F44336' }}>
          {isIncrease ? '+5%' : '-2%'}
        </p>
      </div>
    </div>
  );

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.title}>Dashboard Overview</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div style={styles.cardGrid}>
          <Card title="Total Users" count={stats.users.count} icon={<FaUserCircle />} isIncrease={stats.users.isIncrease} />
          <Card title="Total Orders" count={stats.orders.count} icon={<IoMdCart />} isIncrease={stats.orders.isIncrease} />
          <Card title="Total Products" count={stats.products.count} icon={<MdShoppingBag />} isIncrease={stats.products.isIncrease} />
          <Card title="Total Sales" count={stats.sales.count} icon={<GiStarsStack />} isIncrease={stats.sales.isIncrease} />
        </div>
      )}
    </div>
  );
};

const styles = {
  dashboard: {
    backgroundColor: '#F3F4F6',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    color: '#111827',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    minHeight: '200px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
  },
  cardTitle: {
    margin: '0 0 10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#555',
  },
  cardCount: {
    margin: '0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
  },
  cardChange: {
    marginTop: '5px',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
  },
};

export default CardsDashboard;

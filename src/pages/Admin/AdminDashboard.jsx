import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenu from '../../components/Layouts/AdminMenu';
import { FaBell, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { MdShoppingBag } from 'react-icons/md';
import { GiStarsStack } from 'react-icons/gi';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // State for dynamic stats data
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch dynamic counts from the backend
  useEffect(() => {
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
          setStats({
            users: { count: data.totalUsers, isIncrease: true },
            orders: { count: data.totalOrders, isIncrease: true },
            products: { count: data.totalProducts, isIncrease: true },
            sales: { count: data.totalSales, isIncrease: false },
          });
        } else {
          setStatsError('Failed to fetch stats');
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        setStatsError('Error fetching stats');
      } finally {
        setStatsLoading(false);
      }
    };

    getTotalCounts();
  }, []);

  // A simple Card component for each stat
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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <AdminMenu open={open} drawerWidth={240} />

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: isMobile ? 0 : (open ? 240 : 70),
          transition: 'margin 0.3s ease',
          overflow: 'auto',
          backgroundColor: '#f0f2f5',
        }}
      >
        {/* Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1rem',
            backgroundColor: '#fff',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>Admin Dashboard</h1>
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              color: '#555',
              cursor: 'pointer',
              fontSize: '1.5rem',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaBell size={24} style={{ marginRight: '1rem', color: '#555' }} />
            <FaShoppingCart size={24} style={{ color: '#555' }} />
          </div>
        </div>

        {/* Dashboard Summary Section (Dynamic Cards Only) */}
        <div style={{ padding: '1rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Overview</h2>
          {statsLoading ? (
            <p style={{ textAlign: 'center' }}>Loading stats...</p>
          ) : statsError ? (
            <p style={{ textAlign: 'center', color: 'red' }}>{statsError}</p>
          ) : (
            <div style={styles.cardGrid}>
              <Card title="Total Users" count={stats.users.count} icon={<FaUserCircle />} isIncrease={stats.users.isIncrease} />
              <Card title="Total Orders" count={stats.orders.count} icon={<IoMdCart />} isIncrease={stats.orders.isIncrease} />
              <Card title="Total Products" count={stats.products.count} icon={<MdShoppingBag />} isIncrease={stats.products.isIncrease} />
              <Card title="Total Sales" count={stats.sales.count} icon={<GiStarsStack />} isIncrease={stats.sales.isIncrease} />
            </div>
          )}
        </div>

        {/* Main Content Outlet */}
        <div
          style={{
            padding: '1rem',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Outlet /> {/* Nested routes will be rendered here */}
        </div>
      </div>
    </div>
  );
};

const styles = {
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

export default AdminDashboard;

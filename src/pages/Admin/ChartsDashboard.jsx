import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line,
} from 'recharts';

const data = [
  { month: 'Jan', orders: 65, sales: 40 },
  { month: 'Feb', orders: 59, sales: 50 },
  { month: 'Mar', orders: 80, sales: 60 },
  { month: 'Apr', orders: 81, sales: 70 },
  { month: 'May', orders: 56, sales: 90 },
  { month: 'Jun', orders: 55, sales: 100 },
];

const ChartsDashboard = () => {
  return (
    <div style={styles.dashboard}>
      <h1 style={styles.title}>Sales Performance Dashboard</h1>
      <div style={styles.chartsContainer}>
        <div style={styles.chartWrapper}>
          <h2 style={styles.chartTitle}>Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#555' }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 'bold', fill: '#555' }} />
              <Tooltip contentStyle={styles.tooltip} />
              <Legend />
              <Bar dataKey="orders" fill="#6366F1" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.chartWrapper}>
          <h2 style={styles.chartTitle}>Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 'bold', fill: '#555' }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 'bold', fill: '#555' }} />
              <Tooltip contentStyle={styles.tooltip} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10B981" activeDot={{ r: 8 }} animationDuration={1500} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
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
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  chartWrapper: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  chartTitle: {
    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
    color: '#111827',
    marginBottom: '20px',
  },
  tooltip: {
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  },
};

export default ChartsDashboard;

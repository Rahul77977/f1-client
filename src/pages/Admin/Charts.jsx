import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Chart } from 'react-chartjs-2';
import { FaUsers, FaShoppingCart, FaBoxes, FaDollarSign, FaChartLine } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = () => {
  const Card = ({ title, value, icon, color, increase }) => (
    <div className="card" style={{
      background: '#ffffff',
      borderRadius: '20px',
      padding: '20px',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      height: '100%',
      minHeight: '200px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: 'none',
    }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '2.5rem', color: color }}>{icon}</div>
      <div>
        <h3 style={{ margin: '0 0 10px', fontSize: '1rem', fontWeight: 'bold', color: '#555' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>{value}</p>
        <p style={{ 
          margin: '5px 0 0', 
          fontSize: '0.8rem', 
          color: increase.startsWith('+') ? '#4CAF50' : '#F44336',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap'
        }}>
          {increase} <FaChartLine style={{ marginLeft: '5px' }} />
        </p>
      </div>
    </div>
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#555',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#555',
        borderWidth: 1,
        padding: 15,
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#555',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#555',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 70],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Orders',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 3000, 5000, 2000, 3000, 9000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home'],
    datasets: [
      {
        label: 'Sales',
        data: [35, 30, 15, 20],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(99, 102, 241, 0.8)',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#F3F4F6' }}>
      <h1 style={{ marginBottom: '30px', color: '#111827', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 'bold' }}>All Charts</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <Card title="Total Users" value="1,234" icon={<FaUsers />} color="#6366F1" increase="+5%" />
        <Card title="Total Orders" value="5,678" icon={<FaShoppingCart />} color="#10B981" increase="+12%" />
        <Card title="Total Products" value="9,101" icon={<FaBoxes />} color="#F59E0B" increase="+3%" />
        <Card title="Total Sales" value="$12,345" icon={<FaDollarSign />} color="#EF4444" increase="+8%" />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#111827', fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 'bold' }}>Sales Overview</h2>
          <div style={{ height: '300px' }}>
            <Line options={chartOptions} data={lineChartData} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#111827', fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 'bold' }}>Revenue by Month</h2>
          <div style={{ height: '300px' }}>
            <Bar options={chartOptions} data={barChartData} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#111827', fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 'bold' }}>Sales Distribution</h2>
          <div style={{ height: '300px' }}>
            <Doughnut options={chartOptions} data={doughnutChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;

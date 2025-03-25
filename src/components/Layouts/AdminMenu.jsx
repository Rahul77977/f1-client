import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaTag, FaProductHunt, FaUsers, FaSignOutAlt, FaCog } from 'react-icons/fa';

const AdminMenu = ({ open, drawerWidth }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };

  return (
    <div
      style={{
        width: open ? drawerWidth : 0,
        transition: 'width 0.3s ease',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#2c3e50', // Main sidebar background color
        color: '#ecf0f1',
        overflowX: 'hidden',
        overflowY: 'auto',
        boxShadow: open ? '2px 0 10px rgba(0, 0, 0, 0.1)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          padding: '1rem',
          borderBottom: '1px solid #34495e',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: open ? '1.5rem' : '0',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.3s ease',
            whiteSpace: 'nowrap',
          }}
        >
          Admin Panel
        </h2>
      </div>

      <nav style={{ flexGrow: 1, padding: '1rem 0' }}>
        {[
          { to: "/admin/homedash", icon: <FaChartBar />, text: "Dashboard" },
          { to: "/admin/create-category", icon: <FaTag />, text: "Quisines" },
          { to: "/admin/product", icon: <FaProductHunt />, text: "Items" },
          { to: "/admin/create-product", icon: <FaProductHunt />, text: "Create  A Room" },
          { to: "/admin/users", icon: <FaUsers />, text: "Users" },
          { to: "/admin/orders", icon: <FaUsers />, text: "Bookings" },
          { to: "/admin/Banner", icon: <FaUsers />, text: "HomeBanner" },
          { to: "/admin/car", icon: <FaUsers />, text: "bannerupdate" },


          { to: "/admin/charts", icon: <FaCog />, text: "charts" },
          { to: "/", icon: <FaHome />, text: "Home" },
        ].map(({ to, icon, text }, index) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              color: '#ecf0f1',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: isActive ? '#34495e' : 'transparent',
              borderLeft: isActive ? '4px solid #3498db' : 'none',
            })}
            className={`w-100 ${activeTab === index && isToggleSubmenu ? 'active' : ''}`}
            onClick={() => isOpenSubmenu(index)}
          >
            {React.cloneElement(icon, { size: 24, style: { minWidth: 24, marginRight: open ? '0.75rem' : 0 } })}
            <span
              style={{
                opacity: open ? 1 : 0,
                transition: 'opacity 0.3s ease',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {text}
            </span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid #34495e' }}>
        <NavLink
          to="/logout"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            color: '#e74c3c',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
        >
          <FaSignOutAlt size={24} style={{ minWidth: 24, marginRight: open ? '0.75rem' : 0 }} />
          <span style={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s ease' }}>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;

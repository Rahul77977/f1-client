import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { ShoppingCart, ChevronDown, ChevronUp, Menu, X, Search } from "lucide-react";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../store/UseCart";
import userIcon from "../../assets/user.png";
import logo from "../../assets/dotent.jpg";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, firebaseUser, serverUser, LogoutUser, authIsLoading } = useAuth();
  const { cart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const location = useLocation();

  const isAdmin = serverUser?.isAdmin || firebaseUser?.isAdmin;

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchVisible(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsSearchVisible(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  const renderUserMenu = () => {
    return serverUser || firebaseUser ? (
      isAdmin ? (
        <>
          <NavLink className="dropdown-item" to="/admin/homedash">Admin Dashboard</NavLink>
          <NavLink className="dropdown-item" to="/admin/users">Users</NavLink>
          <NavLink className="dropdown-item" to="/admin/create-category">Create Category</NavLink>
          <NavLink className="dropdown-item" to="/admin/create-product">Create Product</NavLink>
          <NavLink className="dropdown-item" to="/admin/orders">Admin Orders</NavLink>
          <NavLink className="dropdown-item" to="/userdash/orders">user Orders</NavLink>

          <button className="dropdown-item" onClick={LogoutUser}>Logout</button>
        </>
      ) : (
        <>
          <NavLink className="dropdown-item" to="/userdash/profile">My Profile</NavLink>
          <NavLink className="dropdown-item" to="/userdash/orders">Orders</NavLink>
          <NavLink className="dropdown-item" to="/cart">Cart</NavLink>
          <button className="dropdown-item" onClick={LogoutUser}>Logout</button>
        </>
      )
    ) : (
      <NavLink className="dropdown-item" to="/login">Login</NavLink>
    );
  };

  const MobileMenuContent = () => (
    <div 
      className={`mobile-menu-container ${isMobileMenuOpen ? 'active' : ''}`}
      onClick={closeMobileMenu}
    >
      <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-user-profile">
          <img
            src={serverUser?.picture || firebaseUser?.photoURL || userIcon}
            alt="User"
            className="mobile-user-avatar"
          />
          <div className="mobile-user-info">
            <div className="mobile-user-name">
              {serverUser?.name || firebaseUser?.displayName || "Guest"}
            </div>
            <div className="mobile-user-email">
              {serverUser?.email || firebaseUser?.email || ""}
            </div>
          </div>
        </div>

        <div className="mobile-menu-links">
          <NavLink to="/" className="mobile-nav-link">Home</NavLink>
          <NavLink to="/about" className="mobile-nav-link">About</NavLink>
          <NavLink to="/services" className="mobile-nav-link">Services</NavLink>
          <NavLink to="/contact" className="mobile-nav-link">Contact</NavLink>
          {isAdmin ? (
            <>
              <NavLink to="/admin/homedash" className="mobile-nav-link">Admin Dashboard</NavLink>
              <NavLink to="/admin/users" className="mobile-nav-link">Users</NavLink>
              <NavLink to="/admin/create-category" className="mobile-nav-link">Create Category</NavLink>
              <NavLink to="/admin/create-product" className="mobile-nav-link">Create Product</NavLink>
              <NavLink to="/admin/orders" className="mobile-nav-link">Admin Orders</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/userdash/profile" className="mobile-nav-link">My Profile</NavLink>
              <NavLink to="/userdash/orders" className="mobile-nav-link">Orders</NavLink>
            </>
          )}
          {serverUser || firebaseUser ? (
            <button 
              className="mobile-nav-link"
              onClick={() => {
                LogoutUser();
                closeMobileMenu();
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="mobile-nav-link">Login</NavLink>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container-fluid px-4">
        <div className="custom-logo-wrapper">
          <NavLink to="/" className="navbar-brand custom-logo">
            <img 
              src={logo} 
              alt="Gagan Deluxe Lodge" 
              className="dynamic-logo"
            />
          </NavLink>
        </div>

        <div className="d-none d-lg-flex align-items-center gap-4 ms-4 nav-links">
          <NavLink to="/about" className="nav-link magic-link">About</NavLink>
          <NavLink to="/services" className="nav-link magic-link">Services</NavLink>
          <NavLink to="/contact" className="nav-link magic-link">Contact</NavLink>
        </div>

        <div className="search-container">
          <div className={`search-wrapper ${isSearchVisible ? 'mobile-search-visible' : ''}`}>
            <SearchInput />
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button 
            className="search-toggle d-lg-none"
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            {isSearchVisible ? <X size={20} /> : <Search size={20} />}
          </button>

          <NavLink to="/cart" className="position-relative cart-link shine-effect">
            <ShoppingCart size={20} />
            {cart?.length > 0 && (
              <span className="cart-badge pulse">
                {cart.length}
              </span>
            )}
          </NavLink>

          <div
            className="dropdown d-none d-lg-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button className="user-menu-btn glow-effect">
              <Menu size={20} />
              <img
                src={serverUser?.picture || firebaseUser?.photoURL || userIcon}
                alt="User"
                className="user-icon"
              />
              <span className="d-none d-md-inline">
                {serverUser?.name || firebaseUser?.displayName || "Guest"}
              </span>
              {isHovered ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div className={`dropdown-menu dropdown-menu-end ${isHovered ? "show" : ""}`}>
              {renderUserMenu()}
            </div>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <MobileMenuContent />
    </nav>
  );
};

export default Navbar;
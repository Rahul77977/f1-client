import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import "./Footer.css";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Truck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() === "") {
      toast.error("Please enter a valid email!");
      return;
    }
    toast.success("Subscribed successfully! Check your inbox.");
    setEmail("");
  };

  return (
    <footer className="footer">
      <Toaster />
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3>Subscribe for Exclusive Deals</h3>
              <p className="text-muted">Get updates on new dishes, offers, and discounts.</p>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubscribe} className="btn newsletter-btn d-flex align-items-center">
                  Subscribe <ArrowRight className="ms-2" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container">
        <div className="row g-4 animate-footer">
          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="list-unstyled">
              {["Home", "Menu", "Offers", "About Us", "Contact"].map((item) => (
                <li key={item} className="mb-2">
                  <a href="#" className="footer-link">
                    <ArrowRight size={18} /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Links */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Policies</h4>
            <ul className="list-unstyled">
              {["Privacy Policy", "Terms and Conditions", "Cancellation and Refund", "Shipping and Delivery", "Contact Us"].map((item) => (
                <li key={item} className="mb-2">
                  <a href="#" className="footer-link">
                    <ArrowRight size={18} /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="list-unstyled">
              <li className="contact-item">
                <span className="contact-icon">
                  <MapPin size={20} />
                </span>
                <span>Main Street, Your City, 123456</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <Phone size={20} />
                </span>
                <span>Customer Support: 9876543210</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <Mail size={20} />
                </span>
                <span><a href="mailto:support@tastybites.com">support@tastybites.com</a></span>
              </li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Why Choose Us?</h4>
            <ul className="list-unstyled">
              <li className="contact-item">
                <span className="contact-icon">
                  <Truck size={20} />
                </span>
                <span>Fast & Reliable Delivery</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <ShoppingCart size={20} />
                </span>
                <span>Wide Variety of Cuisines</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <ShieldCheck size={20} />
                </span>
                <span>Fresh & Quality Ingredients</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0">© 2024 Tasty Bites. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-center justify-content-md-end gap-4">
                {["Privacy Policy", "Terms and Conditions", "Cancellation and Refund", "Shipping and Delivery", "Contact Us"].map((item) => (
                  <a key={item} href="#" className="footer-bottom-link">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

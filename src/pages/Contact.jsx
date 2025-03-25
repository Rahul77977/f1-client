import React, { useState } from 'react';
import Layout from '../components/Layouts/Layout.jsx';
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/xjkgqvdr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <Layout>
      {/* Ticker Animation Section */}
      <div className="bg-dark text-white py-2">
        <div className="container">
          <div className="ticker">
            <span className="ticker-text">
              Welcome to Gagan Deluxe Lodge! Enjoy our exclusive offers and unbeatable hospitality.
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="position-relative d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1551861568-21d2d93c2e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          transition: 'all 0.5s ease-in-out'
        }}
      >
        <div
          className="overlay position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        ></div>
        <div className="container position-relative text-center">
          <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">
            Contact Us
          </h1>
          <p className="lead animate__animated animate__fadeInDown">
            We’re here to help. Reach out to us anytime!
          </p>
        </div>
      </div>

      {/* Contact Info and Form Section */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Contact Details */}
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h2 className="mb-4 get-in-touch-title">Get in Touch</h2>
            <ul className="list-unstyled fs-5 contact-list">
              <li className="mb-3 transition-hover">
                <strong>Owner:</strong> Anand
              </li>
              <li className="mb-3 transition-hover">
                <strong>Landline:</strong> 08156 450 587
              </li>
              <li className="mb-3 transition-hover">
                <strong>Phone:</strong> 8073268581
              </li>
              <li className="mb-3 transition-hover">
                <strong>Mobile:</strong> 8217305467
              </li>
              <li className="mb-3 transition-hover">
                <strong>Location:</strong> M.G. Road, Behind Delux Fresh Bakery, <br />
                Chikkaballapura - 562101
              </li>
            </ul>
            <p className="fs-5">
              We’re dedicated to providing you with the best service. Please reach out with any questions!
            </p>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 transition-hover" style={{ transition: 'transform 0.3s' }}>
              <div className="card-body p-4">
                <h3 className="card-title mb-4">Send Us a Message</h3>
                {submitted ? (
                  <p className="text-success">Thank you! Your message has been sent.</p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Name
                      </label>
                      <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email
                      </label>
                      <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label fw-semibold">
                        Message
                      </label>
                      <textarea className="form-control" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="How can we help you?" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

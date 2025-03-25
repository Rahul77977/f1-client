import React from 'react';
import Layout from '../components/Layouts/Layout.jsx';
import { useAuth } from '../store/Auth.jsx';
import './About.css'; // Import the separate CSS file
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery3.jpg";
import gallery3 from "../assets/gallery3.jpg";

const About = () => {
  const { user } = useAuth();

  return (
    <Layout title="About Us">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h2 className="hero-welcome">
              Welcome, {user?.name}! Discover our story.
            </h2>
            <h1 className="hero-title">Gagan Delux Lodge</h1>
            <p className="hero-subtitle">Exceeding Expectations Every Stay</p>
            <p className="hero-date">Grand Opening on 17-02-2025 (Monday)</p>
          </div>
        </div>
      </section>

      {/* About Info */}
      <section className="about-info container">
        <h2 className="section-title">About Gagan Delux Lodge</h2>
        <p className="about-text">
          We are thrilled to announce the Grand Opening of Gagan Delux Lodge. 
          Our mission is to offer a luxurious stay with exceptional service 
          that truly exceeds expectations, every time.
        </p>
        <p className="about-text">
          Located beside Delux Bakery, opposite the Rural Police Station in Chikkaballapur, 
          our lodge provides easy access to major attractions while offering 
          a peaceful retreat for our guests.
        </p>
      </section>

      {/* Business Details */}
      <section className="business-details container">
        <h2 className="section-title">Our Business Details</h2>
        <ul className="details-list">
          <li><strong>Owner:</strong> Anand</li>
          <li><strong>Landline:</strong> 08156 450 587</li>
          <li><strong>Phone:</strong> 8073268581</li>
          <li><strong>Mobile:</strong> 8217305467</li>
          <li>
            <strong>Location:</strong> Beside Delux Bakery, Opposite Rural Police Station, Chikkaballapur
          </li>
        </ul>
      </section>

      {/* Map Section */}
      <section className="map-section container">
        <h2 className="section-title">Find Us</h2>
        <div className="map-container">
          <iframe 
            title="Gagan Deluxe Lodge Location"
            src="https://www.google.com/maps?q=Beside+Delux+Bakery,+Opposite+Rural+Police+Station,+Chikkaballapur&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section container">
        <h2 className="section-title">Gallery</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src={gallery1} alt="Gallery 1" />
            <div className="gallery-overlay">
              <p className="overlay-text">Beautiful Lobby</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src={gallery2} alt="Gallery 2" />
            <div className="gallery-overlay">
              <p className="overlay-text">Spacious Rooms</p>
            </div>
          </div>
          <div className="gallery-item">
            <img src={gallery3} alt="Gallery 3" />
            <div className="gallery-overlay">
              <p className="overlay-text">Modern Amenities</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

import image1 from "../assets/gagan.jpg";
import image2 from "../assets/gagan.jpg";
import image3 from "../assets/gagan.jpg";
import image4 from "../assets/gagan.jpg";
import image5 from "../assets/gagan.jpg";
import image6 from "../assets/gagan.jpg";

const GaganDeluxePromo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const promotionalItems = [
    {
      id: 1,
      title: "Luxury Suites",
      description: "Elegantly designed rooms with breathtaking views",
      imageUrl: image1,
      discount: "First Stay 20% OFF",
      rating: 4.9,
      category: "Premium"
    },
    {
      id: 2,
      title: "Executive Rooms",
      description: "Modern comfort meets sophisticated design",
      imageUrl: image2,
      discount: "Early Bird Special",
      rating: 4.8,
      category: "Comfort"
    },
    {
      id: 3,
      title: "Panoramic Suites",
      description: "Unwind in spacious rooms with stunning landscapes",
      imageUrl: image3,
      discount: "Grand Opening Offer",
      rating: 4.9,
      category: "Signature"
    },
    {
      id: 4,
      title: "Wellness Retreat",
      description: "Rejuvenate in our spa-inspired accommodations",
      imageUrl: image4,
      discount: "Wellness Package",
      rating: 4.7,
      category: "Relaxation"
    },
    {
      id: 5,
      title: "Dining Experience",
      description: "Gourmet cuisine with breathtaking ambiance",
      imageUrl: image5,
      discount: "Culinary Delight",
      rating: 4.8,
      category: "Dining"
    },
    {
      id: 6,
      title: "Event Spaces",
      description: "World-class venues for memorable gatherings",
      imageUrl: image6,
      discount: "Corporate Packages",
      rating: 4.9,
      category: "Events"
    }
  ];

  const totalSlides = Math.ceil(promotionalItems.length / 2);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < Math.floor(rating) ? 'text-warning' : 'text-muted'}`}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="promotional-slider position-relative py-5 bg-light">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="display-4 fw-bold mb-3 text-primary">Gagan Deluxe Lodge</h2>
            <p className="lead text-muted">Experience Luxury, Comfort, and Unforgettable Moments</p>
          </div>
        </div>

        <div id="gaganDeluxeCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <div
                key={slideIndex}
                className={`carousel-item ${slideIndex === activeIndex ? 'active' : ''}`}
              >
                <div className="row g-4">
                  {promotionalItems.slice(slideIndex * 2, slideIndex * 2 + 2).map((item) => (
                    <div key={item.id} className="col-md-6">
                      <div className="card h-100 border-0 shadow-lg hover-transform">
                        <div className="position-relative overflow-hidden">
                          <img
                            src={item.imageUrl}
                            className="card-img-top"
                            alt={item.title}
                          />
                          <div className="position-absolute top-0 start-0 p-3">
                            <span className="badge bg-danger rounded-pill">{item.discount}</span>
                          </div>
                          <div className="position-absolute top-0 end-0 p-3">
                            <span className="badge bg-primary rounded-pill">{item.category}</span>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="card-title mb-0 fw-bold text-dark">{item.title}</h5>
                            <div className="d-flex align-items-center">
                              {renderStars(item.rating)}
                              <span className="ms-2 text-muted small">{item.rating}</span>
                            </div>
                          </div>
                          <p className="card-text text-muted">{item.description}</p>
                          <button className="btn btn-primary w-100 rounded-pill">Explore Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            onClick={prevSlide}
            style={{ width: '5%' }}
          >
            <span className="bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
              <ChevronLeft size={24} className="text-white" />
            </span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={nextSlide}
            style={{ width: '5%' }}
          >
            <span className="bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center">
              <ChevronRight size={24} className="text-white" />
            </span>
          </button>
        </div>

        {/* Custom Indicators */}
        <div className="d-flex justify-content-center mt-4 gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm rounded-circle p-2 ${
                index === activeIndex ? 'btn-primary' : 'btn-outline-primary'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          .hover-transform {
            transition: all 0.4s ease;
            transform-style: preserve-3d;
          }
          .hover-transform:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
          }
          .carousel-control-prev,
          .carousel-control-next {
            opacity: 0.9;
          }
          .carousel-item {
            transition: transform 0.6s ease-in-out;
          }
          .card {
            border-radius: 20px;
            overflow: hidden;
          }
          .card img {
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            object-fit: cover;
            height: 350px;
            transition: transform 0.4s ease;
          }
          .card img:hover {
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
};

export default GaganDeluxePromo;
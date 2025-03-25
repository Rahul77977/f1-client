import React, { useEffect, useState } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css';
import { useAuth } from '../store/Auth';

const   Carousel = () => {
  const { AuthorizationToken } = useAuth(); // Get the AuthorizationToken from context
  const [images, setImages] = useState([]);

  // Fetch carousel images from backend
  const fetchCarouselImages = async () => {
    try {
      const response = await fetch('https://f1-server-1.onrender.com/api/v1/product/carousel-images', {
        method: 'GET',
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch carousel images');
      }

      const data = await response.json();
      setImages(data.images); // Assuming the backend returns images in { images: [...] }
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, [AuthorizationToken]); // Fetch images when the AuthorizationToken changes

  return (
    <div className="carousel-container">
      <BootstrapCarousel
        interval={5000}
        indicators
        controls
        prevIcon={
          <div className="carousel-icon">
            <ChevronLeft size={24} />
          </div>
        }
        nextIcon={
          <div className="carousel-icon">
            <ChevronRight size={24} />
          </div>
        }
      >
        {images.map((image) => (
          <BootstrapCarousel.Item key={image.public_id}>
            <img src={image.url} alt={`Slide ${image.public_id}`} className="d-block w-100" />
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;

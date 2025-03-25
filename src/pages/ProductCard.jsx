import React from 'react';
import LazyLoad from 'react-lazyload';
import { Star } from 'react-feather';

const ProductCard = ({ title, price, discountedPrice, discount, rating, image, inStock }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        {discount > 0 && (  
          <span className="discount-badge">{discount}% OFF</span>
        )}
        <LazyLoad height={200} offset={100} once>
          <img src={image} alt={title} className="product-image" />
        </LazyLoad>
      </div>
      <div className="card-content">
        <h3 className="product-title">{title}</h3>
        <div className="price-container">
          <span className="discounted-price">₹{discountedPrice}</span>
          {price && price !== discountedPrice && (
            <span className="original-price">₹{price}</span>
          )}
        </div>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(rating) ? "#FFA41C" : "none"} stroke="#FFA41C" />
          ))}
        </div>
        <p className="stock-info">{inStock ? 'In Stock' : 'Out of Stock'}</p>
      </div>
    </div>
  );
};

export default ProductCard;

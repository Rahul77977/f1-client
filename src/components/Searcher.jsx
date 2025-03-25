import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layouts/Layout';
import { useSearch } from '../store/Search';
import "./searchproduct.css";

const ProductCard = ({ title, price, discountedPrice, discount, rating, images, inStock }) => {
  return (
    <div className="rpc-product-card">
      <div className="rpc-image-gallery">
        {images && images.length > 0 ? (
          <img src={images[0].url} alt={title} className="rpc-product-image" />
        ) : (
          <div className="rpc-no-image">No Image</div>
        )}
        {discount > 0 && <span className="rpc-discount-badge">{discount}% OFF</span>}
      </div>
      <div className="rpc-card-content">
        <h3 className="rpc-product-title">{title}</h3>
        <div className="rpc-price-container">
          <span className="rpc-discounted-price">Rs {discountedPrice}</span>
          {price && price !== discountedPrice && (
            <span className="rpc-original-price">Rs {price}</span>
          )}
        </div>
        <div className="rpc-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`rpc-star ${i < Math.floor(rating) ? 'filled' : ''}`}>★</span>
          ))}
        </div>
        <p className={`rpc-stock-info ${inStock ? 'in-stock' : 'out-of-stock'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
};

const Searcher = () => {
  const { searchItem } = useSearch();

  return (
    <Layout>
      <div className="rpc-container">
        <h1 className="rpc-search-result">
          {searchItem.result.length < 1 
            ? 'No products found' 
            : `Found ${searchItem.result.length} products`}
        </h1>
        
        {searchItem.result.length > 0 ? (
          <div className="rpc-product-grid">
            {searchItem.result.map((p) => (
              <Link key={p._id} to={`/product/${p.slug}`} className="rpc-product-link">
                <ProductCard
                  title={p.name}
                  price={p.originalPrice}
                  discountedPrice={p.discountedPrice}
                  discount={p.discount}
                  rating={p.rating}
                  images={p.images}
                  inStock={p.stock > 0}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="rpc-no-products">No products available</p>
        )}
      </div>
    </Layout>
  );
};

export default Searcher;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Checkbox, FormControl, FormControlLabel, RadioGroup, Radio, Button, CircularProgress, Container } from '@mui/material';
import './HomeProduct.css';
  import useCategory from '../hooks/useCategory';

// ProductCard Component
// const ProductCard = ({ title, price, discountedPrice, discount, rating, images, inStock }) => {
//   return (
//     <div className="rpc-product-card">
//       <div className="rpc-image">
//         {images && images.length > 0 ? (
//           <img src={images[0].url} alt={title} className="productImage" />
//         ) : (
          
//           <span className="no-image">No Image</span>
//         )}
//         {discount > 0 && <span className="rpc-discount-badge">{discount}% OFF</span>}
//       </div>
//       <div className="rpc-card-content">
//         <h3 className="rpc-product-title">{title}</h3>
//         <div className="rpc-price-container">
//           <span className="rpc-discounted-price">Rs {discountedPrice}</span>
//           {price && price !== discountedPrice && (
//             <span className="rpc-original-price">Rs {price}</span>
//           )}
//         </div>
//         <div className="rpc-rating">
//           {[...Array(5)].map((_, i) => (
//             <span key={i} className={`rpc-star ${i < Math.floor(rating) ? 'filled' : ''}`}>★</span>
//           ))}
//         </div>
//         <p className="rpc-stock-info">{inStock ? 'In Stock' : 'Out of Stock'}</p>
//       </div>
//     </div>
//   );
// };
// Updated ProductCard Component
const ProductCard = ({ title, price, discountedPrice, discount, rating, images, inStock }) => {
  return (
    <div className="restaurant-card">
      <div className="card-image-container">
        {images && images.length > 0 ? (
          <img src={images[0].url} alt={title} className="card-image" />
        ) : (
          <span className="no-image">No Image</span>
        )}
        {discount > 0 && <span className="promoted-badge">{discount}% OFF</span>}
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="restaurant-name">{title}</h3>
          <div className="rating">
            <span>{rating}</span>
            {/* Placeholder for star icon */}
            <span className="star-icon">★</span>
          </div>
        </div>
        <div className="cuisine-types">
          {inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <div className="card-footer">
          <span className="price">Rs {discountedPrice}</span>
          {price && price !== discountedPrice && (
            <span className="original-price">Rs {price}</span>
          )}
        </div>
      </div>
    </div>
  );
};


// SkeletonProductCard Component
const SkeletonProductCard = () => {
  return (
    <div className="rpc-product-card skeleton">
      <div className="rpc-image-gallery">
        <div className="skeleton-image"></div>
      </div>
      <div className="rpc-card-content">
        <div className="skeleton-text skeleton-title"></div>
        <div className="rpc-price-container">
          <div className="skeleton-text skeleton-price"></div>
        </div>
        <div className="rpc-rating">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-star"></div>
          ))}
        </div>
        <div className="skeleton-text skeleton-stock"></div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return pageNumbers;
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - halfVisible, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const visiblePages = pageNumbers.slice(start - 1, end);

    if (start > 1) {
      visiblePages.unshift('...');
    }
    if (end < totalPages) {
      visiblePages.push('...');
    }

    return visiblePages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

// HomeProduct Component
const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { categories, error: categoryError } = useCategory();

  const getAllProducts = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`https://food-5mu1.onrender.com/api/v1/product/product-list/${page}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products || []);
        setTotalPages(Math.ceil(data.total / data.perPage));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch products.');
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://food-5mu1.onrender.com/api/v1/product/product-filters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked, radio }),
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products || []);
        setTotalPages(Math.ceil(data.total / data.perPage));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to filter products.');
      console.error('Failed to filter products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="featured-products-section">
      <h2 className="section-title">Featured Products</h2>
      
      <Button variant="outlined" onClick={() => setDrawerOpen(true)} className="filter-button">
        Filter Products
      </Button>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="filter-container">
          <h4>Filter By Category</h4>
          <div className="filter-category">
            {categories.length > 0 ? (
              categories.map((c) => (
                <FormControlLabel
                  key={c._id}
                  control={
                    <Checkbox
                      checked={checked.includes(c._id)}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    />
                  }
                  label={c.name}
                />
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>

          <h4>Filter By Price</h4>
          <div className="filter-price">
            <FormControl component="fieldset">
              <RadioGroup
                value={radio.length ? radio[0] : ''}
                onChange={(e) => setRadio([e.target.value])}
              >
                <FormControlLabel value="[0,999]" control={<Radio />} label="₹0 - 999" />
                <FormControlLabel value="[1000,1999]" control={<Radio />} label="₹1000 - 1999" />
                <FormControlLabel value="[2000,2999]" control={<Radio />} label="₹2000 - 2999" />
                <FormControlLabel value="[3000,30000]" control={<Radio />} label="₹3000 - 30000" />
              </RadioGroup>
            </FormControl>
          </div>
          
          <Button variant="contained" color="primary" onClick={() => {
            setDrawerOpen(false);
            if (checked.length || radio.length) {
              filterProducts();
            } else {
              getAllProducts(currentPage);
            }
          }}>
            Apply Filters
          </Button>
          <Button variant="contained" color="secondary" onClick={() => {
            setChecked([]);
            setRadio([]);
            getAllProducts(currentPage);
          }}>
            Reset Filters
          </Button>
        </div>
      </Drawer>

      {loading ? (
        <div className="rpc-product-container">
          {[...Array(8)].map((_, index) => (
            <SkeletonProductCard key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <>
          <div className="rpc-product-container">
            {products.length > 0 ? (
              products.map((p) => (
                <Link key={p._id} to={`/product/${p.slug}`} className="product-link">
                  <ProductCard
                    title={p.name}
                    price={p.price}
                    discountedPrice={p.discountedPrice}
                    discount={p.discount}
                    rating={p.rating}
                    images={p.images}
                    inStock={p.quantity > 0}
                  />
                </Link>
              ))
            ) : (
              <p className="no-products">No products found.</p>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default HomeProduct;
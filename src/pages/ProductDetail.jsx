import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../store/UseCart";
import toast from "react-hot-toast";
import LazyLoad from "react-lazy-load";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const { cart, setCart } = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params?.slug) getProduct();
  }, [params?.slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const getProduct = async () => {
    try {
      const response = await fetch(
        `https://f1-server-1.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      const data = await response.json();
      if (data.success) {
        const productData = data.product;
        setProduct(productData);
        if (productData.images.length > 0) {
          setSelectedImage(productData.images[0].url);
        }
        getsimilarproduct(productData._id, productData.category._id);
      } else {
        console.error("Error fetching product:", data.message);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getsimilarproduct = async (pid, cid) => {
    try {
      const response = await fetch(
        `https://f1-server-1.onrender.com/api/v1/product/similar-product/${pid}/${cid}`
      );
      const data = await response.json();
      if (data.success) {
        setRelatedProducts(data.products);
      } else {
        console.error("Error fetching related products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleImageZoom = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} className={i <= rating ? "filled-star" : "empty-star"} />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    // Check if the product is already in the cart by comparing _id
    const isInCart = cart.some((item) => item._id === product._id);
    if (isInCart) {
      toast.info("This item is already in cart");
      return;
    }
    // Optionally, check stock availability before adding
    if (product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    // Otherwise, add the product to the cart
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout title={`Product Details ${product.name}`}>
      <div className="container">
        <div className="product-details-container">
          <div className="product-image-container">
            <div
              className="product-main-image-wrapper"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleImageZoom}
            >
              <img
                ref={imageRef}
                src={selectedImage || product.images?.[0]?.url}
                alt={product.name}
                className="product-main-image"
              />
              {isZoomed && (
                <div
                  className="product-zoom-overlay"
                  style={{
                    backgroundImage: `url(${selectedImage || product.images?.[0]?.url})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </div>
            <div className="product-image-gallery">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${product.name} - Image ${index + 1}`}
                  onClick={() => setSelectedImage(image.url)}
                  className={selectedImage === image.url ? "active" : ""}
                />
              ))}
            </div>
          </div>
          <div className="product-info-container">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-rating">
              {renderStars(product.rating)}
              <span className="product-reviews">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>
            <div className="product-price">
              <span className="discounted-price">₹{product.discountedPrice}</span>
              <span className="original-price">₹{product.price}</span>
              <span className="discount">{product.discount}% OFF</span>
            </div>
            <div className="product-description">
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>
            <div className="product-meta">
              <div className="product-meta-item">
                <span className="product-meta-label">Category:</span>
                <span className="product-meta-value">{product?.category?.name}</span>
              </div>
              <div className="product-meta-item">
                <span className="product-meta-label">Availability:</span>
                <span
                  className={`product-meta-value ${
                    product.stock > 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="related-products-section">
          <h2>Similar Products</h2>
          <div className="related-products-grid">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((p) => (
                <Link key={p._id} to={`/product/${p.slug}`} className="product-link">
                  <div className="related-product-card">
                    <div className="related-product-image-container">
                      <LazyLoad height={200} offset={100}>
                        <img
                          src={p.images[0]?.url || "default-image-url"}
                          alt={p.name}
                          className="related-product-image"
                        />
                      </LazyLoad>
                      {p.discount > 0 && (
                        <span className="related-product-discount-badge">
                          {p.discount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="related-product-content">
                      <h3 className="related-product-name">{p.name}</h3>
                      <div className="related-product-price-container">
                        <span className="related-product-discounted-price">₹{p.discountedPrice}</span>
                        {p.discount > 0 && (
                          <span className="related-product-original-price">₹{p.price}</span>
                        )}
                      </div>
                      <div className="related-product-rating">
                        {renderStars(p.rating)}
                        <span className="related-product-reviews">({p.reviewCount || 0})</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-related-products">No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

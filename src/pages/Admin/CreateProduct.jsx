import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../store/Auth";
import useCategory from '../../hooks/useCategory';
import { FaBox, FaRupeeSign, FaPercent, FaStar, FaTruck, FaUpload, FaTrashAlt } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdDescription } from 'react-icons/md';
import LazyLoad from 'react-lazyload';
import './createproduct.css'; // Custom CSS styles

const CreateProduct = () => {
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const { categories, error } = useCategory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(""); // renamed from quantity to stock
  const [shipping, setShipping] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate discounted price whenever price or discount changes
  useEffect(() => {
    const priceValue = parseFloat(price) || 0;
    const discountValue = parseFloat(discount) || 0;
    const calculatedDiscountedPrice = priceValue - (priceValue * (discountValue / 100));
    setDiscountedPrice(calculatedDiscountedPrice.toFixed(2));
  }, [price, discount]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...newImages.map((image) => image.preview),
    ]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("discountedPrice", discountedPrice);
      productData.append("discount", discount);
      productData.append("rating", rating);
      productData.append("stock", stock); // update here: using stock instead of quantity
      productData.append("category", category);
      productData.append("shipping", shipping);

      images.forEach((image) => {
        productData.append("files", image.file);
      });

      const response = await fetch("https://f1-server-1.onrender.com/api/v1/product/create-product", {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: productData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Product Created Successfully");
        navigate("/admin/product");
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-product-container">
      <div className="create-product-card">
        <div className="create-product-header">
          <h2><FaBox /> Create Room</h2>
        </div>
        <div className="create-product-body">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleCreate}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Room Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">
                  <BiCategoryAlt /> Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                <MdDescription /> Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">
                  <FaRupeeSign /> Price (INR)
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="discount">
                  <FaPercent /> Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="discountedPrice">
                  <FaRupeeSign /> Discounted Price
                </label>
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rating">
                  <FaStar /> Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">
                  <FaBox /> Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="shipping">
                  <FaTruck /> Shipping
                </label>
                <select
                  id="shipping"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  required
                >
                  <option value="">Select shipping option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="imageUpload">
                <FaUpload /> Upload Images
              </label>
              <input
                type="file"
                id="imageUpload"
                onChange={handleImageChange}
                multiple
                accept="image/*"
              />
            </div>

            <div className="image-preview">
              {imagePreviews.map((preview, index) => (
                <LazyLoad key={index} height={100} once>
                  <div className="image-preview-item">
                    <img
                      src={preview}
                      alt={`Product Preview ${index}`}
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => handleImageRemove(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </LazyLoad>
              ))}
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <FaBox /> Create Product
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

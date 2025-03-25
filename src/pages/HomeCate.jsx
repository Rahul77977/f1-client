import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useCategory from '../hooks/useCategory';
import './Category.css';

const HomeCate = () => {
  const { categories, error } = useCategory();
  const [fullCategories, setFullCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryImages = async () => {
    try {
      const responses = await Promise.all(
        categories.map(cat =>
          fetch(`https://f1-server-1.onrender.com/api/v1/category/category-image/${cat._id}`).then(res => res.blob())
        )
      );

      const images = await Promise.all(
        responses.map(response => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(response);
          });
        })
      );

      setFullCategories(categories.map((cat, index) => ({
        ...cat,
        image: images[index]
      })));

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch category images:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      fetchCategoryImages();
    }
  }, [categories]);

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  const SkeletonLoader = () => (
    <div className="categories-container">
      <div className="categories-row">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="category-item">
            <div className="category-image-container">
              <Skeleton height={150} width={150} />
            </div>
            <Skeleton width={100} />
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="categories-container">
      <div className="categories-row">
        {fullCategories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.slug}`}
            className="category-item"
          >
            <div className="category-image-container">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
            </div>
            <p className="category-name">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCate;
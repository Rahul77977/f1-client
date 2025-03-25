import React, { useEffect, useState } from 'react';

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const getAllCategory = async () => {
    try {
      const response = await fetch('https://f1-server-1.onrender.com/api/v1/category/get-category/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      // Extract only the necessary information (category names)
      setCategories(data.categories.map(cat => ({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug
      })));
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return { categories, error };
};

export default useCategory;

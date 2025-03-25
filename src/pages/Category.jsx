import React from 'react';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layouts/Layout'; // Ensure correct import

const Categories = () => {
  const { categories, error } = useCategory(); // Destructure properly
  
  if (error) {
    return <div className="container mt-3">Error: {error}</div>;
  }

  return (
    <Layout title="All Categories"> {/* Ensure Layout component handles title */}
      <div className="container mt-3">
        <div className="row">
          {categories.length > 0 ? (
            categories.map((c) => (
              <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <Link to={`/category/${c.slug}`} className="btn btn-primary">
                  {c.name}
                </Link>
              </div>
            ))
          ) : (
            <div className="container mt-3">No Categories Found</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

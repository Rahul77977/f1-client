import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Container, Table, Badge, Image } from 'react-bootstrap';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await fetch('https://f1-server-1.onrender.com/api/v1/product/get-products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
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

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">All Rooms</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Rating</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <Image
                    src={p.images && p.images.length > 0 ? p.images[0].url : '/fallback-image.jpg'}
                    alt={p.name}
                    thumbnail
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <Link to={`/product/${p.slug}`} className="text-decoration-none text-dark">
                    {p.name}
                  </Link>
                </td>
                <td>
                  {p.discount > 0 ? (
                    <>
                      <del className="text-secondary">Rs {p.price}</del>{' '}
                      <span className="text-success">Rs {p.discountedPrice}</span>
                    </>
                  ) : (
                    `Rs ${p.price}`
                  )}
                </td>
                <td>
                  {p.discount > 0 && (
                    <Badge pill bg="success" className="px-2 py-1">
                      {p.discount}% OFF
                    </Badge>
                  )}
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <Star size={18} className="text-warning me-1" />
                    <span>{p.rating}</span>
                  </div>
                </td>
                <td>
                  <span className={`fw-bold ${p.stock > 0 ? 'text-success' : 'text-danger'}`}>
                    {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  <Link to={`/product/${p.slug}`} className="btn btn-primary btn-sm me-2">
                    View
                  </Link>
                  <Link to={`/admin/product/${p.slug}`} className="btn btn-warning btn-sm">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProductTable;

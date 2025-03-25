import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Image, ListGroup, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../store/Auth';

// Component for managing carousel images
const Car = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('update'); // 'update' or 'delete'
  const [formData, setFormData] = useState({ public_id: '', url: '' });
  const [error, setError] = useState('');
  const { AuthorizationToken } = useAuth();

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://f1-server-1.onrender.com/api/v1/product/carousel-images', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: AuthorizationToken,
          },
        });
        const data = await response.json();
        if (data.success) {
          setImages(data.images);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Error fetching images.");
      }
    };

    fetchImages();
  }, [AuthorizationToken]);

  // Handle image updates
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://f1-server-1.onrender.com/api/v1/product/updatec/${selectedImage._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setImages(images.map(img => img._id === selectedImage._id ? data.image : img));
        handleClose();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Error updating image:", err);
      setError("Error updating image.");
    }
  };

  // Handle image deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://f1-server-1.onrender.com/api/v1/product/deletec/${selectedImage._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      if (data.success) {
        setImages(images.filter(img => img._id !== selectedImage._id));
        handleClose();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Error deleting image.");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ public_id: '', url: '' });
    setSelectedImage(null);
  };

  const openUpdateModal = (image) => {
    setSelectedImage(image);
    setFormData({ public_id: image.public_id, url: image.url });
    setModalMode('update');
    setShowModal(true);
  };

  const openDeleteModal = (image) => {
    setSelectedImage(image);
    setModalMode('delete');
    setShowModal(true);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Carousel Images</h1>
          {error && <div className="alert alert-danger">{error}</div>}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <ListGroup>
            {images.map((image) => (
              <ListGroup.Item key={image._id} className="d-flex align-items-center justify-content-between mb-2">
                <Image src={image.url} rounded width={100} />
                <div className="ms-2">
                  <Button variant="primary" className="me-2 mb-1 mb-sm-0" onClick={() => openUpdateModal(image)}>Update</Button>
                  <Button variant="danger" onClick={() => openDeleteModal(image)}>Delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {/* Modal for updating or deleting image */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'update' ? 'Update Image' : 'Delete Image'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode === 'update' ? (
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formPublicId">
                <Form.Label>Public ID</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.public_id}
                  onChange={(e) => setFormData({ ...formData, public_id: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formUrl" className="mt-3">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Update</Button>
            </Form>
          ) : (
            <div>
              <p>Are you sure you want to delete this image?</p>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Car;

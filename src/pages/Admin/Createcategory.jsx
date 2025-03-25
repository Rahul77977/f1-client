import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/Auth';
import { toast } from 'react-toastify';
import { Modal, Button, Form, Table, Card, Container, Row, Col } from 'react-bootstrap';
import { Edit, Delete, Add, CloudUpload } from '@mui/icons-material';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 2rem;
`;

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const StyledCardBody = styled(Card.Body)`
  padding: 2rem;
`;

const StyledTitle = styled.h1`
  color: #3498db;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled(Form)`
  margin-bottom: 2rem;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;
`;

const StyledFormControl = styled(Form.Control)`
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ImagePreview = styled.img`
  max-width: 150px;
  max-height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-top: 1rem;
`;

const ImageUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px dashed #3498db;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f8ff;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { AuthorizationToken } = useAuth();
  const [name, setName] = useState('');
  const [stocks, setStocks] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [updateStocks, setUpdateStocks] = useState(0);
  const [updateImage, setUpdateImage] = useState(null);
  const [updateImagePreview, setUpdateImagePreview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('stocks', stocks);
      if (image) formData.append('photo', image);

      const response = await fetch('https://f1-server-1.onrender.com/api/v1/category/create-category', {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: formData
      });

      const resdata = await response.json();

      if (response.ok) {
        toast.success(`${name} category created successfully`);
        getAllCategories();
        setName('');
        setStocks(0);
        setImage(null);
        setImagePreview('');
      } else {
        toast.error(resdata.message || "Failed to create category");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the category");
    }
  };

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://f1-server-1.onrender.com/api/v1/category/get-category', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          setCategories(data.categories || []);
        } else {
          setError(data.message);
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setError('Failed to fetch categories.');
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', updateName);
      formData.append('stocks', updateStocks);
      if (updateImage) formData.append('photo', updateImage);

      const response = await fetch(`https://f1-server-1.onrender.com/api/v1/category/update-category/${selected._id}`, {
        method: "PUT",
        headers: {
          Authorization: AuthorizationToken,
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setUpdateStocks(0);
        setUpdateImage(null);
        setUpdateImagePreview('');
        setShowModal(false);
        getAllCategories();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://f1-server-1.onrender.com/api/v1/category/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: AuthorizationToken,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategories();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdateImageChange = (e) => {
    const file = e.target.files[0];
    setUpdateImage(file);
    setUpdateImagePreview(URL.createObjectURL(file));
  };

  return (
    <StyledContainer>
      <Row className="justify-content-center">
        <Col md={10}>
          <StyledCard>
            <StyledCardBody>
              <StyledTitle className="text-center">Category Management</StyledTitle>
              <StyledForm onSubmit={handleSubmit}>
                <StyledFormGroup>
                  <StyledFormControl
                    type="text"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledFormControl
                    type="number"
                    placeholder="Enter stocks count"
                    value={stocks}
                    onChange={(e) => setStocks(e.target.value)}
                    required
                  />
                </StyledFormGroup>
                <StyledFormGroup>
                  <ImageUploadLabel>
                    <CloudUpload style={{ fontSize: 48, color: '#3498db', marginBottom: '0.5rem' }} />
                    <span>Choose category image</span>
                    <HiddenFileInput
                      type="file"
                      id="categoryImage"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </ImageUploadLabel>
                  {imagePreview && (
                    <ImagePreview src={imagePreview} alt="Category Preview" />
                  )}
                </StyledFormGroup>
                <StyledButton variant="primary" type="submit" className="w-100">
                  <Add className="me-2" />
                  Add Category
                </StyledButton>
              </StyledForm>
              {error && <p className="text-danger">{error}</p>}
              {loading ? (
                <Table striped bordered hover responsive className="mt-4">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Name</th>
                      <th>Stocks</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, index) => (
                      <tr key={index}>
                        <td><Skeleton width={150} /></td>
                        <td><Skeleton width={80} /></td>
                        <td><Skeleton height={100} width={100} /></td>
                        <td>
                          <Skeleton width={50} />
                          <Skeleton width={50} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                categories.length > 0 ? (
                  <Table striped bordered hover responsive className="mt-4">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>Name</th>
                        <th>Stocks</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category._id}>
                          <td>{category.name}</td>
                          <td>{category.stocks}</td>
                          <td>
                            <img
                              src={`https://f1-server-1.onrender.com/api/v1/category/category-image/${category._id}`}
                              alt="Category"
                              style={{ maxWidth: '100px', maxHeight: '100px' }}
                            />
                          </td>
                          <td>
                            <StyledButton
                              variant="warning"
                              onClick={() => {
                                setSelected(category);
                                setUpdateName(category.name);
                                setUpdateStocks(category.stocks);
                                setUpdateImagePreview(`https://f1-server-1.onrender.com/api/v1/category/category-image/${category._id}`);
                                setShowModal(true);
                              }}
                            >
                              <Edit />
                            </StyledButton>
                            <StyledButton
                              variant="danger"
                              onClick={() => handleDelete(category._id)}
                              className="ms-2"
                            >
                              <Delete />
                            </StyledButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No categories available.</p>
                )
              )}
            </StyledCardBody>
          </StyledCard>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledForm onSubmit={handleUpdate}>
            <StyledFormGroup>
              <StyledFormControl
                type="text"
                placeholder="Enter new category name"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                required
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledFormControl
                type="number"
                placeholder="Enter new stocks count"
                value={updateStocks}
                onChange={(e) => setUpdateStocks(e.target.value)}
                required
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <ImageUploadLabel>
                <CloudUpload style={{ fontSize: 48, color: '#3498db', marginBottom: '0.5rem' }} />
                <span>Choose new category image</span>
                <HiddenFileInput
                  type="file"
                  id="updateCategoryImage"
                  onChange={handleUpdateImageChange}
                  accept="image/*"
                />
              </ImageUploadLabel>
              {updateImagePreview && (
                <ImagePreview src={updateImagePreview} alt="Update Category Preview" />
              )}
            </StyledFormGroup>
            <StyledButton variant="primary" type="submit" className="w-100">
              Update Category
            </StyledButton>
          </StyledForm>
        </Modal.Body>
      </Modal>
    </StyledContainer>
  );
};

export default CreateCategory;
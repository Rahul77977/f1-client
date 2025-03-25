import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import toast from "react-hot-toast";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import useCategory from "../../hooks/useCategory";

const UpdateProduct = () => {
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { categories } = useCategory();

  const [product, setProduct] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    discount: "",
    rating: "",
    category: "",
    stock: "",
    shipping: "No",
    images: [],
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await fetch(`https://f1-server-1.onrender.com/api/v1/product/get-product/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct({
          _id: data.product._id, // Include the _id from backend
          name: data.product.name ?? "",
          description: data.product.description ?? "",
          price: data.product.price ?? "",
          discountedPrice: data.product.discountedPrice ?? "",
          discount: data.product.discount ?? "",
          rating: data.product.rating ?? "",
          stock: data.product.stock ?? "", // Use stock instead of quantity
          shipping: data.product.shipping ? "Yes" : "No",
          category: data.product.category?._id ?? "",
          images: data.product.images ?? [],
        });

        if (data.product.images && data.product.images.length > 0) {
          setPreview(data.product.images[0].url);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product details");
      }
    };
    getSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.price && product.discount) {
      const calculatedDiscountedPrice =
        product.price - (product.price * product.discount) / 100;
      setProduct((prev) => ({
        ...prev,
        discountedPrice: calculatedDiscountedPrice.toFixed(2),
      }));
    }
  }, [product.price, product.discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        // Always append even if the value is "", so our backend always receives a defined value
        productData.append(key, value);
      });
      if (photo) productData.append("photo", photo);

      // Use product._id instead of slug here:
      const response = await fetch(
        `https://f1-server-1.onrender.com/api/v1/product/update-product/${product._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: AuthorizationToken,
          },
          body: productData,
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Product updated successfully");
        navigate("/admin/product");
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(
        `https://f1-server-1.onrender.com/api/v1/product/delete-product/${product._id}`,
        {
          method: "DELETE",
          headers: { Authorization: AuthorizationToken },
        }
      );

      if (response.status === 401) {
        const text = await response.text();
        toast.error(text || "Unauthorized");
        return;
      }

      const data = await response.json();
      if (data.success) {
        toast.success("Product deleted successfully");
        navigate("/admin/product");
      } else {
        toast.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Body>
          <h1 className="text-center mb-4">
            <PencilSquare className="me-2" /> Update Product
          </h1>
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select name="category" value={product.category || ""} onChange={handleChange} required>
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control name="name" value={product.name || ""} onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
                </Form.Group>
                {preview && (
                  <div className="text-center mt-3">
                    <Image src={preview} alt="Selected" thumbnail width={150} />
                  </div>
                )}
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={product.description || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={product.price || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    value={product.discount || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Discounted Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountedPrice"
                    value={product.discountedPrice || ""}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={product.rating || ""}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={product.stock || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Shipping</Form.Label>
                  <Form.Select
                    name="shipping"
                    value={product.shipping || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select shipping option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center">
              <Button type="submit">Update Product</Button>
              <Button variant="danger" className="ms-2" onClick={handleDelete}>
                <TrashFill /> Delete Product
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateProduct;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/Auth';
import './UploadBannerImages.css';

const UploadBannerImages = () => {
  const { AuthorizationToken } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

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

  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('https://f1-server-1.onrender.com/api/v1/product/uploadc', {
        method: 'POST',
        headers: {
          Authorization: AuthorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        alert('Images uploaded successfully');
        setSelectedFiles([]);
        setPreviewUrls([]);
        // Refresh the images list
        const updatedImagesResponse = await fetch('https://f1-server-1.onrender.com/api/v1/product/carousel-images', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: AuthorizationToken,
          },
        });
        const updatedImagesData = await updatedImagesResponse.json();
        if (updatedImagesData.success) {
          setImages(updatedImagesData.images);
        }
      } else {
        console.error('Upload failed:', await response.text());
        alert('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-banner-container">
      <h2 className="upload-title">Upload Banner Images</h2>
      <div className="upload-area">
        <label htmlFor="file-upload" className="custom-file-upload">
          <i className="fa fa-cloud-upload"></i> Choose Files
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="upload-button"
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </button>
      </div>
      
      {previewUrls.length > 0 && (
        <div className="preview-container">
          <h3>Selected Images</h3>
          <div className="preview-grid">
            {previewUrls.map((url, index) => (
              <div key={index} className="preview-item">
                <img src={url} alt={`Preview ${index}`} className="preview-image" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="uploaded-images-container">
        <h3>Uploaded Images</h3>
        {images.length > 0 ? (
          <div className="image-grid">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.url} alt={`Uploaded ${index}`} className="uploaded-image" />
              </div>
            ))}
          </div>
        ) : (
          <p className="no-images">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UploadBannerImages;
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProductAPI } from '../services/productService';
import './index.css';

export default function AddProductComponent({ onClose }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const newProduct = { name, price: parseFloat(price), type, description };
      const response = await addProductAPI(newProduct);

      if (response.ok) {
        onClose();
        router.push('/products');
      } else {
        setError('Failed to add product');
      }
    } catch (err) {
      console.error('Add product error:', err);
      setError('An error occurred while adding the product');
    }
  }

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <h2>Add Product</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Enter product name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              value={price}
              placeholder="Enter product price"
              onChange={(e) => setPrice(e.target.value)}
              required
              step="0.01"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <input
              type="text"
              className="form-control"
              value={type}
              placeholder="Enter product type"
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              value={description}
              placeholder="Enter product description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
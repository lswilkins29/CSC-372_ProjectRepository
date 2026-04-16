import { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const AddProductComponent = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, price, type, description };
    ProductsService.createProduct(newProduct).then(() => {
      navigate('/products');
    });
  };

  useEffect(() => {
    document.title = 'Add Product';
  }, []);
  return (
    <div>
      <h2 className="text-center">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text" className="form-control" value={name}
            onChange={(e) => setName(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" className="form-control"
            value={price} onChange={(e) => setPrice(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text" className="form-control" value={type}
            onChange={(e) => setType(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control" value={description}
            onChange={(e) => setDescription(e.target.value)} required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Product</button>
      </form>
    </div>
  );
}
export default AddProductComponent;
import { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';


const ProductDetailsComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    document.title = 'Product Details';
    ProductsService.getProductById(id).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  return (
    <div>
      <h2 className="text-center">Product Details</h2>
      <Link to="/add-product" className="btn btn-outline-primary">Add Product</Link>
      <div id="details-container">
        <div className="card-holder">
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <p>Type: {product.type}</p>
          <p>Description: {product.description}</p>
        </div>
        <div className="card-footer text-body-secondary">
          <Link to="/products" className="card-link">Product List</Link>
        </div>
      </div>
    </div>
  );
};



export default ProductDetailsComponent;
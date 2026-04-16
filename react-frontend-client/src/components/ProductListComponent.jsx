import React, { useState, useEffect } from 'react';
import ProductsService from '../ProductsService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';


const ProductsListComponent = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (type) {
      ProductsService.getProductsByType(type).then((res) => {
        setProducts(res.data);
        document.title = `Products of type ${type}`;
      });
    } else {
      ProductsService.getProducts().then((res) => {
        setProducts(res.data);
        document.title = 'Products List';
      });
    }
  }, [type]);

  return (
    <div>
      <h2 className="text-center">{type ? type + ' List': 'Products List'}</h2>
      {type && <Link to="/products" className="card-link">Product List</Link>}
      <div className="row">
        <Link to="/add-product" className="btn btn-outline-primary">Add Product</Link>
      </div>
      <main className="items-container">
        {products.map(product => (
          <article className="item" key={product.id}>
            <div className="text">
              <h3>
                {product.id}:{product.name}
              </h3>
              <p>${product.price}</p>
              <p>Type: {product.type}</p>
              <p>Description: {product.description}</p>
              <p><Link to={`/products/type/${product.type}`}>{product.type}</Link></p>
              <p><Link className="detail-button" to={`/products/${product.id}`}>View</Link></p>
              <button className="delete-button" onClick={() => ProductsService.deleteProduct(product.id)
                .then(() => setProducts(products.filter(p => p.id !== product.id)))}>Delete</button>

            </div>
          </article>
        ))}
      </main>
      <h2> Products Table</h2>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><Link className="view-link" to={`/products/${product.id}`}>{product.id}</Link></td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.type}</td>
                <td>{product.description}</td>
                <td>
                  <button className="delete-button" onClick={() => ProductsService.deleteProduct(product.id)
                    .then(() => setProducts(products.filter(p => p.id !== product.id)))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsListComponent;

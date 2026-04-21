'use client';
import { useState } from 'react';
import './index.css';
import AddProductComponent from './AddProductComponent';

export default function ProductsLayout({ children }) {

  const [showAddProduct, setShowAddProduct] = useState(false);
  return (
    <>
      <nav className="products-navigation">
        <ul>
          <li><a href="/products">Home</a></li>
          <li><a href="/products/type/furniture">Furniture</a></li>
          <button onClick={() => setShowAddProduct(true)}>
            {!showAddProduct && 'Add Product'}
          </button>

        </ul>
      </nav>
      {showAddProduct && <AddProductComponent onClose={() => setShowAddProduct(false)} />}
      {showAddProduct && (
        <button className="cancel-button" onClick={() => setShowAddProduct(false)}>
          Cancel
        </button>
      )}
      {children}
    </>
  );
}

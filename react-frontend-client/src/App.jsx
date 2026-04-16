import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import ProductsListComponent from './components/ProductListComponent';
import ProductDetailsComponent from './components/ProductDetailsComponent';
import AddProductComponent from './components/AddProductComponent';


function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProductsListComponent />} />
          <Route path="/products" element={<ProductsListComponent />} />
          <Route path="/products/:id" element={<ProductDetailsComponent />} />          
          <Route path="/products/type/:type" element={<ProductsListComponent />} />
          <Route path="/add-product" element={<AddProductComponent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

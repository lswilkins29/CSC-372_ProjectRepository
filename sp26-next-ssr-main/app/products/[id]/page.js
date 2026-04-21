import productModel from '../../../model/productModel';
import '../index.css';
import DeleteProductButton from '../../products/DeleteProductButton';

export default async function ProductDetailPage({ params }) {

  const { id } = await params;

  let product = await productModel.getOneProductById(id);
  return (
    <div>
      <h2 className="text-center">Product Details</h2>
      <div id="details-container">
        <div className="card-holder">
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <p>Type: {product.type}</p>
          <p>Description: {product.description}</p>
          <DeleteProductButton productId={product.id} />
        </div>
        <div className="card-footer text-body-secondary">
          <a href="/products" className="card-link">Product List</a>
        </div>
      </div>
    </div>
  );
}
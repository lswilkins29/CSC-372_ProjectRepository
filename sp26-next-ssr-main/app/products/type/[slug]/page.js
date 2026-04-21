import productModel from "../../../../model/productModel";
import '../../index.css';
import DeleteProductButton from '../../../products/DeleteProductButton';

export default async function ProductTypePage({ params }) {

  const { slug } = await params;
  let products = await productModel.getProductsByType([slug]);
  return (
    <div>
      <main className="items-container">
        {products.map(product => (
          <article className="item" key={product.id}>
            <div className="text">
              <h3>{product.id}: {product.name}</h3>
              <p>${product.price}</p>
              <p>
                Type: <a href={`/products/type/${product.type}`}>{product.type}</a>
              </p>
              <p>Description: {product.description}</p>
              <div className="item-actions">
                <a className="detail-button" href={`/products/${product.id}`}>
                  View
                </a>
                <DeleteProductButton productId={product.id} />
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
'use client';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '../services/productService';

export default function DeleteProductButton({ productId }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await deleteProduct(productId);

      if (response.ok) {
        router.push('/products');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the product');
    }
  }

  return (
    <button className="delete-button" onClick={handleDelete}>
      Delete
    </button>
  );
}

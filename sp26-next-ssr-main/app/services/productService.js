// API utility service for product operations
export async function deleteProduct(productId) {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'DELETE'
  });
  return response;
}

export async function addProductAPI(productData) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  return response;
}

import productModel from '../../../model/productModel';

export async function POST(request) {
  try {
    const { name, type, price, description } = await request.json();
    const newProduct = await productModel.addProduct(name, type, price, description);
    return Response.json(newProduct);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
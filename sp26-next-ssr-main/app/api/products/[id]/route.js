import productModel from '../../../../model/productModel';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const rowCount = await productModel.deleteProduct(id);

    if (rowCount > 0) {
      return Response.json({ success: true });
    } else {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

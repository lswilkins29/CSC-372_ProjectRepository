import partyModel from '../../../../model/partyModel';

export async function DELETE(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || 'default_user';
    const position = parseInt(params.id);

    if (isNaN(position) || position < 1 || position > 6) {
      return Response.json({ error: 'Invalid position' }, { status: 400 });
    }

    const deleted = await partyModel.removeFromParty(userId, position);
    
    if (deleted === 0) {
      return Response.json({ error: 'No Pokémon at that position' }, { status: 404 });
    }
    
    return Response.json({ success: true, deleted });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
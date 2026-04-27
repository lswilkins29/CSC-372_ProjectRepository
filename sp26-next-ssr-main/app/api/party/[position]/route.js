import partyModel from '../../../../model/partyModel';
import { requireAuth, unauthorizedResponse } from '../../../utils/authHelper';

export async function DELETE(request, { params }) {
  const session = await requireAuth();
  if (!session) return unauthorizedResponse();

  try {
    const userEmail = session.user.email;
    const position = parseInt(params.id);

    if (isNaN(position) || position < 1 || position > 6) {
      return Response.json({ error: 'Invalid position' }, { status: 400 });
    }

    const deleted = await partyModel.removeFromParty(userEmail, position);
    
    if (deleted === 0) {
      return Response.json({ error: 'No Pokémon at that position' }, { status: 404 });
    }
    
    return Response.json({ success: true, deleted });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
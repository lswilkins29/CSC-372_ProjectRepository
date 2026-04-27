import partyModel from '../../../model/partyModel';
import { requireAuth, unauthorizedResponse } from '../../utils/authHelper';

export async function GET(request) {
  const session = await requireAuth();
  if (!session) return unauthorizedResponse();

  try {
    const userEmail = session.user.email;
    const party = await partyModel.getPartyByUserId(userEmail);
    return Response.json(party);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await requireAuth();
  if (!session) return unauthorizedResponse();

  try {
    const { pokemon_id, pokemon_name, pokemon_sprite, position } = await request.json();
    
    if (!pokemon_id || !pokemon_name || !position) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userEmail = session.user.email;
    const newPartyMember = await partyModel.addToParty(
      userEmail, 
      pokemon_id, 
      pokemon_name, 
      pokemon_sprite, 
      position
    );
    
    return Response.json(newPartyMember);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
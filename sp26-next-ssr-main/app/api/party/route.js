import partyModel from '../../../model/partyModel';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || 'default_user';
    
    const party = await partyModel.getPartyByUserId(userId);
    return Response.json(party);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { user_id, pokemon_id, pokemon_name, pokemon_sprite, position } = await request.json();
    
    if (!pokemon_id || !pokemon_name || !position) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userId = user_id || 'default_user';
    const newPartyMember = await partyModel.addToParty(
      userId, 
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
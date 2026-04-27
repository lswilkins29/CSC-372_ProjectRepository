import partyModel from '../../../model/partyModel';
import { requireAuth, unauthorizedResponse } from '../../utils/authHelper';

export async function GET(request) {
  const session = await requireAuth();
  if (!session) return unauthorizedResponse();

  try {
    const parties = await partyModel.getAllParties();
    return Response.json(parties);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
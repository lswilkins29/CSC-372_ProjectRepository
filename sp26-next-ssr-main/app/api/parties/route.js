import partyModel from '../../../model/partyModel';

export async function GET(request) {
  try {
    const parties = await partyModel.getAllParties();
    return Response.json(parties);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
// API route to proxy requests to PokeAPI
const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search');
  const id = searchParams.get('id');

  try {
    let url;
    
    if (id) {
      // Fetch specific Pokémon by ID
      url = `${POKEAPI_BASE}/pokemon/${id}`;
    } else if (query) {
      // Search Pokémon by name
      url = `${POKEAPI_BASE}/pokemon/${query.toLowerCase()}`;
    } else {
      // Get list of Pokémon (Generation 1: 151 total)
      url = `${POKEAPI_BASE}/pokemon?limit=151`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return Response.json({ error: 'Pokémon not found' }, { status: 404 });
      }
      return Response.json({ error: 'Failed to fetch from PokeAPI' }, { status: response.status });
    }

    const data = await response.json();

    // If it's a list, fetch details for each Pokémon
    if (data.results) {
      const detailedPokemon = await Promise.all(
        data.results.map(async (p) => {
          const detailResponse = await fetch(p.url);
          return detailResponse.json();
        })
      );
      
      return Response.json({
        count: data.count,
        results: detailedPokemon.map(p => ({
          id: p.id,
          name: p.name,
          sprite: p.sprites.front_default,
          types: p.types.map(t => t.type.name)
        }))
      });
    }

    // Return single Pokémon details
    return Response.json({
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
      sprites: data.sprites,
      types: data.types.map(t => t.type.name),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map(a => a.ability.name),
      stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
    });

  } catch (error) {
    console.error('PokeAPI proxy error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
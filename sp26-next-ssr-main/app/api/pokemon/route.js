// API route to proxy requests to PokeAPI
const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

// Helper function with timeout
async function fetchWithTimeout(url, timeout = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search');
  const id = searchParams.get('id');

  try {
    let url;
    
    if (id) {
      // Fetch specific Pokémon by ID
      url = `${POKEAPI_BASE}/pokemon/${id}`;
      const response = await fetchWithTimeout(url, 10000);
      if (!response.ok) {
        return Response.json({ error: 'Pokémon not found' }, { status: 404 });
      }
      const data = await response.json();
      return Response.json({
        id: data.id,
        name: data.name,
        sprite: data.sprites?.front_default,
        types: data.types?.map(t => t.type.name) || []
      });
    } else if (query) {
      // Search Pokémon by name
      url = `${POKEAPI_BASE}/pokemon/${query.toLowerCase()}`;
      const response = await fetchWithTimeout(url, 10000);
      if (!response.ok) {
        return Response.json({ error: 'Pokémon not found' }, { status: 404 });
      }
      const data = await response.json();
      return Response.json({
        id: data.id,
        name: data.name,
        sprite: data.sprites?.front_default,
        types: data.types?.map(t => t.type.name) || []
      });
    } else {
      // Get list of Pokémon (only first 20 for fast loading on free tier)
      url = `${POKEAPI_BASE}/pokemon?limit=20&offset=0`;
      const response = await fetchWithTimeout(url, 10000);
      if (!response.ok) {
        return Response.json({ error: 'Failed to fetch Pokemon list' }, { status: 500 });
      }
      const data = await response.json();

      // Fetch details for each Pokémon sequentially to avoid overload
      const detailedPokemon = [];
      for (const p of data.results) {
        try {
          const detailResponse = await fetchWithTimeout(p.url, 5000);
          if (detailResponse.ok) {
            const detail = await detailResponse.json();
            detailedPokemon.push({
              id: detail.id,
              name: detail.name,
              sprite: detail.sprites?.front_default,
              types: detail.types?.map(t => t.type.name) || []
            });
          }
        } catch (err) {
          console.error(`Error fetching ${p.name}:`, err.message);
          // Continue with next Pokemon if one fails
          continue;
        }
      }

      return Response.json({
        count: data.count,
        results: detailedPokemon
      });
    }

  } catch (error) {
    console.error('PokeAPI proxy error:', error.message);
    return Response.json({ error: 'Failed to load Pokémon. Please try again.' }, { status: 500 });
  }
}
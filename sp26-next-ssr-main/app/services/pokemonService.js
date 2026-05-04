// API utility service for Pokémon operations

// Fetch Pokémon from PokeAPI via our proxy
export async function searchPokemon(query) {
  const response = await fetch(`/api/pokemon?search=${encodeURIComponent(query)}`);
  return response.json();
}

export async function getPokemonById(id) {
  const response = await fetch(`/api/pokemon?id=${id}`);
  return response.json();
}

export async function getPokemonList() {
  const response = await fetch('/api/pokemon');
  return response.json();
}

// Party operations
export async function getParty() {
  const response = await fetch('/api/party');
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized. Please sign in.');
    }
    throw new Error('Failed to fetch party');
  }
  return response.json();
}

export async function addToParty(pokemon, position) {
  const response = await fetch('/api/party', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pokemon_id: pokemon.id,
      pokemon_name: pokemon.name,
      pokemon_sprite: pokemon.sprite,
      position
    })
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized. Please sign in.');
    }
    throw new Error('Failed to add to party');
  }
  return response;
}

export async function removeFromParty(position) {
  const response = await fetch(`/api/party/${position}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized. Please sign in.');
    }
    
    let errorMessage = 'Failed to remove from party';
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.error) {
          errorMessage = data.error;
        }
      }
    } catch (e) {
      // If response is not JSON, use default message
    }
    
    throw new Error(errorMessage);
  }
  return response;
}

export async function getAllParties() {
  const response = await fetch('/api/parties');
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized. Please sign in.');
    }
    throw new Error('Failed to fetch parties');
  }
  return response.json();
}
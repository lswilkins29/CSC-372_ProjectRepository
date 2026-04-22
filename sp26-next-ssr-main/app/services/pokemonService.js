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
export async function getParty(userId = 'default_user') {
  const response = await fetch(`/api/party?user_id=${userId}`);
  return response.json();
}

export async function addToParty(pokemon, position, userId = 'default_user') {
  const response = await fetch('/api/party', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      pokemon_id: pokemon.id,
      pokemon_name: pokemon.name,
      pokemon_sprite: pokemon.sprite,
      position
    })
  });
  return response;
}

export async function removeFromParty(position, userId = 'default_user') {
  const response = await fetch(`/api/party/${position}?user_id=${userId}`, {
    method: 'DELETE'
  });
  return response;
}

export async function getAllParties() {
  const response = await fetch('/api/parties');
  return response.json();
}
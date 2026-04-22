"use strict";
const pool = require('./dbConnection');

// Get all parties (for public view)
async function getAllParties() {
  const queryText = `
    SELECT user_id, json_agg(
      json_build_object(
        'id', pokemon_id,
        'name', pokemon_name,
        'sprite', pokemon_sprite,
        'position', position
      ) ORDER BY position
    ) as party 
    FROM parties 
    GROUP BY user_id 
    ORDER BY user_id
  `;
  const result = await pool.query(queryText);
  return result.rows;
}

// Get a specific user's party
async function getPartyByUserId(userId) {
  const queryText = `
    SELECT pokemon_id, pokemon_name, pokemon_sprite, position 
    FROM parties 
    WHERE user_id = $1 
    ORDER BY position
  `;
  const values = [userId];
  const result = await pool.query(queryText, values);
  return result.rows;
}

// Add Pokémon to party
async function addToParty(userId, pokemonId, pokemonName, pokemonSprite, position) {
  // Check if party is full (max 6)
  const checkQuery = "SELECT COUNT(*) as count FROM parties WHERE user_id = $1";
  const checkResult = await pool.query(checkQuery, [userId]);
  
  if (parseInt(checkResult.rows[0].count) >= 6) {
    throw new Error("Party is full (max 6 Pokémon)");
  }
  
  // Check if position is already taken
  const posCheckQuery = "SELECT id FROM parties WHERE user_id = $1 AND position = $2";
  const posCheckResult = await pool.query(posCheckQuery, [userId, position]);
  
  let queryText;
  let values;
  
  if (posCheckResult.rows.length > 0) {
    // Update existing position
    queryText = `UPDATE parties 
                 SET pokemon_id = $1, pokemon_name = $2, pokemon_sprite = $3 
                 WHERE user_id = $4 AND position = $5 
                 RETURNING *`;
    values = [pokemonId, pokemonName, pokemonSprite, userId, position];
  } else {
    // Insert new
    queryText = `INSERT INTO parties (user_id, pokemon_id, pokemon_name, pokemon_sprite, position) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    values = [userId, pokemonId, pokemonName, pokemonSprite, position];
  }
  
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

// Remove Pokémon from party
async function removeFromParty(userId, position) {
  const queryText = "DELETE FROM parties WHERE user_id = $1 AND position = $2 RETURNING *";
  const values = [userId, position];
  const result = await pool.query(queryText, values);
  return result.rowCount;
}

// Clear entire party
async function clearParty(userId) {
  const queryText = "DELETE FROM parties WHERE user_id = $1";
  const values = [userId];
  const result = await pool.query(queryText, values);
  return result.rowCount;
}

module.exports = {
  getAllParties,
  getPartyByUserId,
  addToParty,
  removeFromParty,
  clearParty
};
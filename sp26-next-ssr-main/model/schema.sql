-- Database schema for Pokémon Party App
-- Run these SQL commands to set up your database

-- Table to store user's party Pokémon
CREATE TABLE IF NOT EXISTS parties (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL DEFAULT 'default_user',
  pokemon_id INTEGER NOT NULL,
  pokemon_name VARCHAR(255) NOT NULL,
  pokemon_sprite VARCHAR(500),
  position INTEGER NOT NULL CHECK (position >= 1 AND position <= 6),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Unique constraint: one user can only have one Pokémon per position
ALTER TABLE parties ADD CONSTRAINT unique_user_position UNIQUE (user_id, position);

-- Index for faster party lookups
CREATE INDEX IF NOT EXISTS idx_parties_user_id ON parties(user_id);
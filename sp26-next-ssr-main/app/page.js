'use client';
import { useState, useEffect } from 'react';
import { searchPokemon, getPokemonList, addToParty, getParty } from './services/pokemonService';
import styles from "./page.module.css";

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [party, setParty] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadInitialPokemon(0);
    loadParty();
  }, []);

  async function loadInitialPokemon(page) {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/pokemon?page=${page}`);
      const data = await response.json();
      
      if (data.results) {
        setResults(data.results);
        setCurrentPage(data.page);
        setHasNextPage(data.hasNextPage);
        setHasPrevPage(data.hasPrevPage);
        setIsSearching(false);
      }
    } catch (err) {
      setError('Failed to load Pokémon');
    }
    setLoading(false);
  }

  async function loadParty() {
    try {
      const data = await getParty();
      setParty(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load party:', err);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) {
      setCurrentPage(0);
      loadInitialPokemon(0);
      return;
    }
    
    setLoading(true);
    setError('');
    setIsSearching(true);
    try {
      const data = await searchPokemon(search);
      if (data.error) {
        setError(data.error);
        setResults([]);
      } else if (data.results) {
        setResults(data.results);
      } else {
        setResults([data]);
      }
    } catch (err) {
      setError('Search failed');
    }
    setLoading(false);
  }

  function handleNextPage() {
    if (hasNextPage) {
      loadInitialPokemon(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (hasPrevPage) {
      loadInitialPokemon(currentPage - 1);
    }
  }

  async function handleAddToParty(pokemon) {
    if (!selectedPosition) {
      alert('Please select a party slot first (1-6)');
      return;
    }
    
    try {
      const response = await addToParty(pokemon, selectedPosition);
      if (response.error) {
        alert(response.error);
      } else {
        loadParty();
        setSelectedPosition(null);
        alert(`${pokemon.name} added to position ${selectedPosition}!`);
      }
    } catch (err) {
      alert('Failed to add to party');
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>🔍 Pokémon Search</h1>
        
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokémon (e.g., pikachu, 25)"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}
        
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            <div className={styles.results}>
              {results.map(pokemon => (
                <div key={pokemon.id} className={styles.pokemonCard}>
                  <img 
                    src={pokemon.sprite} 
                    alt={pokemon.name}
                    className={styles.sprite}
                  />
                  <div className={styles.pokemonInfo}>
                    <h3>#{pokemon.id} {pokemon.name}</h3>
                    <p>Type: {pokemon.types?.join(', ') || 'Unknown'}</p>
                    <button 
                      onClick={() => handleAddToParty(pokemon)}
                      className={styles.addButton}
                    >
                      Add to Party
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!isSearching && (
              <div className={styles.pagination}>
                <button 
                  onClick={handlePreviousPage}
                  disabled={!hasPrevPage}
                  className={styles.paginationButton}
                >
                  ← Previous
                </button>
                <span className={styles.pageInfo}>
                  Page {currentPage + 1}
                </span>
                <button 
                  onClick={handleNextPage}
                  disabled={!hasNextPage}
                  className={styles.paginationButton}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

        <div className={styles.partyPreview}>
          <h2>Your Party</h2>
          <div className={styles.partySlots}>
            {[1, 2, 3, 4, 5, 6].map(pos => {
              const member = party.find(p => p.position === pos);
              return (
                <div 
                  key={pos}
                  className={`${styles.slot} ${selectedPosition === pos ? styles.selected : ''}`}
                  onClick={() => setSelectedPosition(pos)}
                >
                  <span className={styles.slotNumber}>{pos}</span>
                  {member ? (
                    <img src={member.pokemon_sprite} alt={member.pokemon_name} />
                  ) : (
                    <span className={styles.empty}>Empty</span>
                  )}
                </div>
              );
            })}
          </div>
          <p className={styles.hint}>
            {selectedPosition 
              ? `Click "Add to Party" to add to slot ${selectedPosition}` 
              : 'Click a slot to select it, then add a Pokémon'}
          </p>
          <a href="/party" className={styles.partyLink}>Manage Full Party →</a>
        </div>
      </main>
    </div>
  );
}

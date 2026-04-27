'use client';
import { useState, useEffect } from 'react';
import { getParty, removeFromParty } from '../services/pokemonService';
import styles from './party.module.css';

export default function PartyPage() {
  const [party, setParty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParty();
  }, []);

  async function loadParty() {
    setLoading(true);
    try {
      const data = await getParty();
      setParty(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load party:', err);
    }
    setLoading(false);
  }

  async function handleRemove(position) {
    try {
      const response = await removeFromParty(position);
      if (response.error) {
        alert(response.error);
      } else {
        loadParty();
      }
    } catch (err) {
      alert('Failed to remove Pokémon');
    }
  }

  // Create array with all 6 positions
  const partySlots = [1, 2, 3, 4, 5, 6].map(pos => {
    const member = party.find(p => p.position === pos);
    return { position: pos, member };
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>🎮 Your Party</h1>
        <p className={styles.subtitle}>Manage your team of up to 6 Pokémon</p>

        {loading ? (
          <div className={styles.loading}>Loading party...</div>
        ) : (
          <div className={styles.partyContainer}>
            {partySlots.map(({ position, member }) => (
              <div key={position} className={styles.slot}>
                <div className={styles.slotLabel}>Slot {position}</div>
                {member ? (
                  <div className={styles.pokemonCard}>
                    <img 
                      src={member.pokemon_sprite} 
                      alt={member.pokemon_name}
                      className={styles.sprite}
                    />
                    <h3 className={styles.pokemonName}>
                      #{member.pokemon_id} {member.pokemon_name}
                    </h3>
                    <button 
                      onClick={() => handleRemove(position)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className={styles.emptySlot}>
                    <span className={styles.emptyIcon}>❔</span>
                    <span>Empty</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className={styles.stats}>
          <h3>Party Stats</h3>
          <p>Total Pokémon: {party.length} / 6</p>
          {party.length === 0 && <p className={styles.hint}>Go to the home page to add Pokémon to your party!</p>}
          {party.length === 6 && <p className={styles.full}>🎉 Your party is full!</p>}
        </div>

        <div className={styles.links}>
          <a href="/" className={styles.link}>← Back to Search</a>
          <a href="/parties" className={styles.link}>View All Parties →</a>
        </div>
      </main>
    </div>
  );
}
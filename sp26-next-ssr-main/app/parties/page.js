import { auth } from '../services/authService';
import partiesModel from '../../model/partyModel';
import './parties.css';
import { redirect } from 'next/navigation';

export default async function PartiesPage() {
  // Check if user is authenticated
  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  let parties = [];
  let error = null;

  try {
    parties = await partiesModel.getAllParties();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="parties-page">
      <main className="parties-main">
        <h1>🌍 All Parties</h1>
        <p className="subtitle">See what everyone&apos;s Pokémon teams look like!</p>

        {error && (
          <div className="error">
            Error loading parties: {error}
          </div>
        )}

        {!error && parties.length === 0 && (
          <div className="empty">
            <p>No parties yet! Be the first to create one.</p>
            <a href="/" className="cta-button">Create Your Party</a>
          </div>
        )}

        <div className="parties-list">
          {parties.map((userParty) => (
            <div key={userParty.user_id} className="party-card">
              <h2 className="user-name">👤 {userParty.user_id}</h2>
              <div className="party-team">
                {userParty.party && userParty.party.map((pokemon) => (
                  <div key={pokemon.position} className="party-member">
                    <span className="position">#{pokemon.position}</span>
                    <img 
                      src={pokemon.sprite} 
                      alt={pokemon.name}
                      className="member-sprite"
                    />
                    <span className="member-name">{pokemon.name}</span>
                  </div>
                ))}
                {(!userParty.party || userParty.party.length === 0) && (
                  <span className="no-members">No Pokémon</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="links">
          <a href="/">← Back to Search</a>
          <a href="/party">Your Party →</a>
        </div>
      </main>
    </div>
  );
}
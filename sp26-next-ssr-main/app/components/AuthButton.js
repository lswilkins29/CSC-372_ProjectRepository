'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import "./auth-button.css";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <span className="auth-loading">Loading...</span>;
  }

  if (session?.user) {
    return (
      <div className="auth-user">
        <span className="user-email">{session.user.email}</span>
        <button 
          onClick={() => signOut()} 
          className="auth-button signout-btn"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => signIn('google')} 
      className="auth-button signin-btn"
    >
      Sign In with Google
    </button>
  );
}

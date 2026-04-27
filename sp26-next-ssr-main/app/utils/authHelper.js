import { auth } from '../services/authService';

/**
 * Middleware to check if user is authenticated
 * Usage: const session = await requireAuth();
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }
  
  return session;
}

/**
 * Helper to send 401 Unauthorized response
 */
export function unauthorizedResponse() {
  return Response.json(
    { error: 'Unauthorized. Please sign in.' },
    { status: 401 }
  );
}

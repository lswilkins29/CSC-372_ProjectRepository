import { auth } from './app/services/authService';

export const middleware = auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const isOnProtectedRoute = req.nextUrl.pathname.startsWith('/pokemon') ||
                              req.nextUrl.pathname.startsWith('/party') ||
                              req.nextUrl.pathname.startsWith('/parties');

  if (isOnProtectedRoute && !isLoggedIn) {
    // Store the callback URL to redirect back after login
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    return Response.redirect(new URL(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url));
  }

  return null;
});

export const config = {
  matcher: ['/pokemon/:path*', '/party/:path*', '/parties/:path*'],
};

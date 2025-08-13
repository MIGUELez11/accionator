import { clerkMiddleware, ClerkMiddlewareAuth } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { ALL_LANGUAGES, DEFAULT_LANGUAGE } from './i18n/tolgee/shared';

function isApiRoute(req: NextRequest) {
  return req.nextUrl.pathname.startsWith('/api');
}

async function handleNonApiRoutes(auth: ClerkMiddlewareAuth, req: NextRequest) {
  return createIntlMiddleware({
    locales: ALL_LANGUAGES,
    defaultLocale: DEFAULT_LANGUAGE,
    localePrefix: 'as-needed',
  })(req);
}

async function clerkHandler(auth: ClerkMiddlewareAuth, req: NextRequest) {
  if (!isApiRoute(req)) {
    return handleNonApiRoutes(auth, req);
  }
}

export default clerkMiddleware(clerkHandler);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

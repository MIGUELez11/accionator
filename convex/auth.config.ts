const CLERK_FRONTEND_API_URL = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL;

if (!CLERK_FRONTEND_API_URL) {
  throw new Error('CLERK_FRONTEND_API_URL is not set');
}

const authConfig = {
  providers: [
    {
      domain: process.env.CLERK_FRONTEND_API_URL,
      applicationID: 'convex',
    },
  ],
};

export default authConfig;

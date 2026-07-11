import { createClient } from '@sanity/client';

// Configure the client
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'yd3h82fk',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Set to false to get fresh data immediately on publish/updates
  apiVersion: '2023-05-03', // API version date
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN || '', // Required for writes/edits from dashboard
});

// A read-only client helper that uses CDN for faster page loads
export const sanityReadClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'yd3h82fk',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

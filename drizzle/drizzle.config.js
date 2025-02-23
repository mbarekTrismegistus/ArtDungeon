import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './drizzle/schema.js',
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
});
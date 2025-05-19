/** @type { import("drizzle-kit").Config } */

export default {
    schema: "./src/db/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:npg_vwjL0ld2QFCR@ep-lucky-recipe-a44cebob-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
    }
  };
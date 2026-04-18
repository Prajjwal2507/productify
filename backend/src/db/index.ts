import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if(!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

// Create a connection pool to the PostgreSQL database using the connection string from environment variables
const pool = new Pool({
    connectionString: ENV.DATABASE_URL,
});


pool.on("connect", () => {
    console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle PostgreSQL client", err);
    process.exit(-1);
});



// Initialize Drizzle ORM with the PostgreSQL connection pool and the defined schema
export const db = drizzle({ client: pool, schema });


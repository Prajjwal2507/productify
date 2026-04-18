import { defineConfig } from "drizzle-kit"
import {ENV} from "./src/config/env";

if(!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: ENV.DATABASE_URL!,
    },
}) 
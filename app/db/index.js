import postgres from "postgres";
import * as schema from "../../drizzle/schema"
import { drizzle } from "drizzle-orm/postgres-js";


const queryConnection = postgres(process.env.DATABASE_URL);

export const db = drizzle(queryConnection, {schema});
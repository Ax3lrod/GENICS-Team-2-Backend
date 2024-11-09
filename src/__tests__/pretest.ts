import { env } from "@/config/env";

if (env.NODE_ENV === "production") {
  console.error("Error: Running tests in production environment is not allowed.");
  process.exit(1);
}

console.log("Environment check passed. Running tests...");

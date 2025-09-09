import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

// Super fast because everything is stored in RAM.
// Popular in Node.js apps for caching, authentication, rate-limiting, queues, etc.
import { rateLimit } from "express-rate-limit";

// rate-limit requests to signup/login (allow 10 requests per IP per 15 mins)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false
});
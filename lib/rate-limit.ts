import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Check if Redis is configured
const isRedisConfigured = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

// Create Redis client only if configured
const redis = isRedisConfigured ? Redis.fromEnv() : null;

// Mock rate limiter for development without Redis
const mockRateLimiter = {
  limit: async () => ({ success: true, limit: 100, remaining: 99, reset: Date.now() + 60000 })
} as any;

export const loginRateLimit = redis 
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true
    })
  : mockRateLimiter;

export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true
    })
  : mockRateLimiter;

export const uploadRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      analytics: true
    })
  : mockRateLimiter;

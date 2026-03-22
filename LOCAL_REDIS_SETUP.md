# 🔴 Local Redis Setup Guide (Optional)

## Overview

Redis is used for **rate limiting** in the CMS. For development, rate limiting is **optional** and disabled by default.

---

## ⚡ Quick Decision

### Skip Redis (Recommended for Development)
✅ Faster setup  
✅ One less service to manage  
✅ Rate limiting automatically disabled  

**Action:** Leave Redis variables commented out in `.env.local`

### Use Local Redis (Optional)
✅ Test rate limiting locally  
✅ More production-like environment  

**Action:** Install Redis and configure `.env.local`

---

## 📦 Installation (Optional)

### macOS (using Homebrew)
```bash
# Install Redis
brew install redis

# Start Redis service
brew services start redis

# Verify it's running
redis-cli ping
# Should return: PONG
```

### Linux (Ubuntu/Debian)
```bash
# Install Redis
sudo apt-get update
sudo apt-get install redis-server

# Start Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Verify
redis-cli ping
```

### Windows
1. Download Redis from https://github.com/microsoftarchive/redis/releases
2. Extract and run `redis-server.exe`
3. Or use WSL and follow Linux instructions

---

## ⚙️ Configuration

### Option 1: No Redis (Default)

Leave Redis variables commented out in `.env.local`:

```env
# Upstash Redis (rate limiting) - OPTIONAL for development
# Leave commented out to disable rate limiting in development
# UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
# UPSTASH_REDIS_REST_TOKEN=your-token
```

**Rate limiting will be automatically disabled.**

### Option 2: Local Redis

If you installed Redis locally, add to `.env.local`:

```env
# Local Redis (optional)
REDIS_URL=redis://localhost:6379
```

**Note:** Current implementation uses Upstash Redis client. To use local Redis, you would need to modify `lib/rate-limit.ts` to use `ioredis` or `redis` package instead.

### Option 3: Upstash Redis (Cloud)

For production-like rate limiting:

1. Create free account at https://upstash.com
2. Create Redis database
3. Copy REST URL and Token
4. Add to `.env.local`:

```env
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

---

## 🔍 Verify Redis is Working

### Local Redis
```bash
# Connect to Redis CLI
redis-cli

# Test commands
SET test "Hello"
GET test
# Should return: "Hello"

# Exit
exit
```

### Check from Node.js
```bash
# Start Node REPL
node

# Test connection
const { Redis } = require('@upstash/redis');
// Will only work if Upstash credentials are set
```

---

## 🛠️ Redis Commands

```bash
# Start Redis (macOS)
brew services start redis

# Stop Redis (macOS)
brew services stop redis

# Check if running
redis-cli ping

# Monitor Redis activity
redis-cli monitor

# View all keys
redis-cli KEYS '*'

# Clear all data
redis-cli FLUSHALL
```

---

## 📊 What Rate Limiting Does

When enabled, rate limiting prevents abuse:

- **Login**: 5 attempts per 15 minutes per IP
- **API**: 100 requests per minute per user
- **Upload**: 20 uploads per hour per user

When disabled (no Redis):
- All rate limits are bypassed
- Suitable for development
- Not recommended for production

---

## 🚀 Development Workflow

### Without Redis (Recommended)
```bash
# 1. Leave Redis commented out in .env.local
# 2. Start dev server
npm run dev

# Rate limiting is automatically disabled
# No Redis needed!
```

### With Redis (Optional)
```bash
# 1. Start Redis
brew services start redis

# 2. Configure Upstash in .env.local
# 3. Start dev server
npm run dev

# Rate limiting is active
```

---

## 🔄 Switching to Production

For production deployment:

1. Create Upstash Redis account (free tier available)
2. Create Redis database
3. Add credentials to Vercel environment variables:
   ```
   UPSTASH_REDIS_REST_URL=https://...
   UPSTASH_REDIS_REST_TOKEN=...
   ```
4. Deploy to Vercel

**Upstash is serverless and requires no infrastructure management.**

---

## ⚠️ Important Notes

### Development
- Redis is **optional** for development
- Rate limiting automatically disabled without Redis
- Saves setup time and complexity

### Production
- Redis is **recommended** for production
- Use Upstash (serverless, managed)
- Prevents abuse and API overload

### Current Implementation
- Uses `@upstash/ratelimit` and `@upstash/redis`
- Automatically falls back to mock limiter if Redis not configured
- No errors if Redis is missing

---

## 🐛 Troubleshooting

### "Redis connection failed"
```bash
# Check if Redis is running
redis-cli ping

# Start Redis
brew services start redis
```

### "ECONNREFUSED"
Redis is not running. Either:
1. Start Redis: `brew services start redis`
2. Or comment out Redis variables in `.env.local`

### Rate limiting not working
Check `.env.local` has valid Upstash credentials:
```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## ✅ Recommendation

**For Development:**
- Skip Redis installation
- Leave Redis variables commented out
- Rate limiting automatically disabled
- Faster, simpler setup

**For Production:**
- Use Upstash Redis (free tier available)
- Enable rate limiting
- Protect against abuse

---

## 📚 Related Documentation

- **Quick Start**: `CMS_QUICKSTART.md`
- **MongoDB Setup**: `LOCAL_MONGODB_SETUP.md`
- **Architecture**: `CMS_ARCHITECTURE.md`

---

**Redis is optional for development!** 🎉

Continue with `CMS_QUICKSTART.md` without Redis.

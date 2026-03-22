# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### ❌ "The uri parameter to openUri() must be a string"

**Problem:** `.env.local` file doesn't exist or MONGODB_URI is not set

**Solution:**
```bash
# Create .env.local from example
cp .env.local.example .env.local

# Verify MongoDB URI is set
cat .env.local | grep MONGODB_URI
# Should show: MONGODB_URI=mongodb://localhost:27017/helio-aegis

# Run seed again
npm run seed
```

---

### ❌ "Connection refused" or "ECONNREFUSED"

**Problem:** MongoDB is not running

**Solution:**
```bash
# Check if MongoDB is running (macOS)
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community@7.0

# Verify it's running
mongosh
# Should connect successfully

# Run seed again
npm run seed
```

---

### ❌ "Module not found" errors

**Problem:** Dependencies not installed

**Solution:**
```bash
# Install all dependencies
npm install

# If issues persist, clean install
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ "Port 3000 already in use"

**Problem:** Another process is using port 3000

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

---

### ❌ Login not working

**Problem:** Database not seeded or wrong credentials

**Solution:**
```bash
# Reset database and reseed
mongosh helio-aegis --eval "db.dropDatabase()"
npm run seed

# Use credentials from seed output:
# Email: admin@helioaegis.com
# Password: Admin123!ChangeMe
```

---

### ❌ "Cannot find module" in seed script

**Problem:** Import paths or module resolution

**Solution:**
Already fixed in the seed script. If you still see this:
```bash
# Make sure you're using the latest code
git pull  # if using git

# Reinstall dependencies
npm install
```

---

### ❌ Redis connection errors

**Problem:** Redis variables set but Redis not running

**Solution:**
```bash
# Option 1: Comment out Redis in .env.local
# UPSTASH_REDIS_REST_URL=...
# UPSTASH_REDIS_REST_TOKEN=...

# Option 2: Install and start Redis
brew install redis
brew services start redis
```

---

### ❌ Cloudinary errors

**Problem:** Cloudinary variables not set

**Solution:**
```bash
# For now, use placeholder values in .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=skip-for-now
CLOUDINARY_API_KEY=skip-for-now
CLOUDINARY_API_SECRET=skip-for-now

# Image uploads won't work yet, but everything else will
```

---

### ❌ NextAuth errors

**Problem:** NEXTAUTH_SECRET not set

**Solution:**
```bash
# Generate a secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET=<generated-secret>
```

---

### ❌ "Cannot read properties of undefined"

**Problem:** Environment variables not loaded

**Solution:**
```bash
# Verify .env.local exists
ls -la .env.local

# Check it has all required variables
cat .env.local

# Restart dev server
npm run dev
```

---

### ❌ MongoDB "Authentication failed"

**Problem:** Wrong MongoDB credentials (if using Atlas)

**Solution:**
```bash
# For local MongoDB, use:
MONGODB_URI=mongodb://localhost:27017/helio-aegis

# For Atlas, verify:
# - Username and password are correct
# - IP is whitelisted
# - Database user has read/write permissions
```

---

### ❌ "Failed to fetch" in browser

**Problem:** API routes not working

**Solution:**
```bash
# Check dev server is running
npm run dev

# Check console for errors
# Open browser DevTools → Console

# Verify API route exists
ls app/api/admin/
```

---

## 🔍 Debugging Tips

### Check Environment Variables
```bash
# View all environment variables
cat .env.local

# Check specific variable
echo $MONGODB_URI
```

### Check MongoDB
```bash
# Connect to MongoDB
mongosh

# Use database
use helio-aegis

# Check collections
show collections

# View users
db.users.find().pretty()

# Count documents
db.users.countDocuments()
```

### Check Logs
```bash
# Dev server logs
npm run dev
# Watch for errors in terminal

# MongoDB logs (macOS)
tail -f /usr/local/var/log/mongodb/mongo.log
```

### Reset Everything
```bash
# Stop all services
brew services stop mongodb-community@7.0

# Remove database
rm -rf /usr/local/var/mongodb/*

# Start MongoDB
brew services start mongodb-community@7.0

# Reseed
npm run seed

# Restart dev server
npm run dev
```

---

## 📞 Still Having Issues?

1. Check `CMS_QUICKSTART.md` for setup steps
2. Review `LOCAL_MONGODB_SETUP.md` for MongoDB
3. Check `START_HERE.md` for documentation index

---

## ✅ Verification Checklist

- [ ] MongoDB installed and running
- [ ] `.env.local` file exists
- [ ] `MONGODB_URI` is set correctly
- [ ] Dependencies installed (`npm install`)
- [ ] Database seeded (`npm run seed`)
- [ ] Dev server running (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Can login at http://localhost:3000/admin/login

---

**Most issues are solved by:**
1. Ensuring MongoDB is running
2. Having a valid `.env.local` file
3. Running `npm install`
4. Running `npm run seed`

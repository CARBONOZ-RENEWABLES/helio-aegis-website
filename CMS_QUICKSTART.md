# 🚀 Quick Start - Helio Aegis CMS

Get the CMS running in 10 minutes.

## Step 1: Install Dependencies (2 min)

```bash
npm install
```

## Step 2: Set Up MongoDB (2 min)

### Option A: Local MongoDB (Recommended for Development)

```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Linux
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# Windows
# Download from https://www.mongodb.com/try/download/community
```

**See `LOCAL_MONGODB_SETUP.md` for detailed instructions**

### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy connection string

## Step 3: Set Up Cloudinary (2 min)

1. Go to https://cloudinary.com/users/register_free
2. Create free account
3. Go to Dashboard
4. Copy: Cloud Name, API Key, API Secret

## Step 4: Set Up Upstash Redis (Optional - 2 min)

**Redis is OPTIONAL for development.** Rate limiting is automatically disabled if Redis is not configured.

### Option A: Skip Redis (Recommended)
Leave Redis variables commented out in `.env.local`. Rate limiting will be disabled.

### Option B: Use Upstash Redis (Optional)
1. Create account at https://upstash.com
2. Create Redis database
3. Copy REST URL and Token to `.env.local`

**See `LOCAL_REDIS_SETUP.md` for details**

## Step 5: Configure Environment (1 min)

Create `.env.local` file:

```env
# MongoDB (Local - recommended for development)
MONGODB_URI=mongodb://localhost:27017/helio-aegis

# OR MongoDB Atlas (Cloud - for production)
# MONGODB_URI=mongodb+srv://YOUR_CONNECTION_STRING

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=run-this-command-openssl-rand-base64-32

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Upstash Redis (rate limiting) - OPTIONAL for development
# Leave commented out to disable rate limiting
# UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
# UPSTASH_REDIS_REST_TOKEN=your-token

# Resend (optional for now)
RESEND_API_KEY=re_skip-for-now
RESEND_FROM_EMAIL=admin@helioaegis.com

# Revalidation
REVALIDATE_SECRET=any-random-string-here

# Initial Admin
INITIAL_ADMIN_EMAIL=admin@helioaegis.com
INITIAL_ADMIN_PASSWORD=ChangeMe123!
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Step 6: Seed Database (30 sec)

```bash
npm run seed
```

You should see:
```
✓ Connected to MongoDB
✓ Created super admin user
✓ Created homepage document
✓ Created initial metrics
✅ Database seeded successfully
```

## Step 7: Start Development Server (30 sec)

```bash
npm run dev
```

## Step 8: Login to Admin Panel

1. Open browser: http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@helioaegis.com`
   - Password: `ChangeMe123!`

3. You should see the admin dashboard!

---

## ✅ You're Ready!

The CMS foundation is now running. You can:

- ✅ Login to admin panel
- ✅ View dashboard with stats
- ✅ Access navigation sidebar
- ✅ See audit trail of actions

## 🚧 What's Next?

The foundation is complete, but you need to build:

1. **Homepage Editor** - Edit all homepage sections
2. **Projects Module** - Create/edit/delete projects
3. **Team Module** - Manage team members
4. **Insights Module** - Publish articles and reports
5. **FAQ Module** - Manage FAQs
6. **Media Library** - Upload and manage images
7. **Public Website Integration** - Connect MongoDB to public pages

See `CMS_IMPLEMENTATION_STATUS.md` for complete roadmap.

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- **Local MongoDB**: Check if MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongod` (Linux)
- **Local MongoDB**: Start MongoDB: `brew services start mongodb-community@7.0` (macOS)
- **Atlas**: Check your MONGODB_URI is correct
- **Atlas**: Ensure IP whitelist includes your IP (or 0.0.0.0/0)
- **Atlas**: Verify database user has read/write permissions

### "Login not working"
- Make sure you ran `npm run seed`
- Check NEXTAUTH_SECRET is set
- Clear browser cookies and try again

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders
- Run `npm install` and `npm run dev` again

---

## 📚 Full Documentation

- **Setup Guide**: `CMS_SETUP_GUIDE.md`
- **Implementation Status**: `CMS_IMPLEMENTATION_STATUS.md`
- **Project README**: `README.md`

---

**Need Help?** Check the documentation files or review the code comments.

# Quick Deployment to Vercel (3 Steps)

## 🚀 Deploy in 5 Minutes

### Step 1: MongoDB Atlas (2 min)
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Create database user with password
4. Whitelist all IPs: `0.0.0.0/0`
5. Copy connection string

### Step 2: Deploy to Vercel (2 min)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Import: `CARBONOZ-RENEWABLES/helio-aegis-website`
4. Add these environment variables:

```env
MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/helio-aegis?retryWrites=true&w=majority
AUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://your-site.vercel.app
```

5. Click **Deploy**

### Step 3: Create Admin User (1 min)
1. Go to MongoDB Atlas → Browse Collections
2. Create collection: `users`
3. Insert this document (replace password hash):

```json
{
  "name": "Admin",
  "email": "admin@helioaegis.com",
  "hashedPassword": "$2a$10$...",
  "role": "super_admin",
  "permissions": {
    "canManageUsers": true,
    "canManageContent": true,
    "canPublish": true,
    "canDelete": true
  },
  "isActive": true
}
```

**Generate password hash:**
```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123!', 10))"
```

---

## ✅ Done!

- **Website**: https://your-site.vercel.app
- **Admin**: https://your-site.vercel.app/admin/login
- **Email**: admin@helioaegis.com
- **Password**: YourPassword123! (or whatever you used)

---

## 📝 Notes

- Images are stored as base64 in MongoDB (no Cloudinary needed)
- Keep images under 2MB for best performance
- Automatic deployments on every push to `main`

## 🆘 Need Help?

See `VERCEL_DEPLOYMENT_SIMPLE.md` for detailed guide.

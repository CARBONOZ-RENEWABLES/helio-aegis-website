# Quick Deployment Checklist

## 🚀 Deploy to Vercel in 5 Minutes

### 1. MongoDB Atlas Setup (2 min)
```
✓ Create free cluster at mongodb.com/cloud/atlas
✓ Create database user
✓ Whitelist all IPs (0.0.0.0/0)
✓ Copy connection string
```

### 2. Vercel Deployment (2 min)
```
✓ Go to vercel.com
✓ Sign in with GitHub
✓ Import: CARBONOZ-RENEWABLES/helio-aegis-website
✓ Add environment variables (see below)
✓ Click Deploy
```

### 3. Environment Variables (1 min)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/helio-aegis
AUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://your-site.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=helio-aegis
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. Create Admin User
```bash
# Generate password hash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123!', 10))"

# Insert into MongoDB users collection:
{
  "name": "Admin",
  "email": "admin@helioaegis.com",
  "hashedPassword": "<paste-hash-here>",
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

### 5. Done! 🎉
```
✓ Visit: https://your-site.vercel.app
✓ Admin: https://your-site.vercel.app/admin/login
```

---

## 📋 Full Guide
See `VERCEL_DEPLOYMENT.md` for detailed instructions.

## 🆘 Need Help?
- Vercel Support: vercel.com/support
- MongoDB Support: mongodb.com/support
- GitHub Repo: github.com/CARBONOZ-RENEWABLES/helio-aegis-website

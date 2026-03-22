# Fix Vercel Build Error: Add Environment Variables

## ❌ Current Error
```
Error: Please define MONGODB_URI in .env.local
```

This means environment variables are NOT set in Vercel.

---

## ✅ Solution: Add Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your project: **helio-aegis-website**

### Step 2: Open Environment Variables Settings
1. Click **Settings** (in the top navigation bar)
2. Click **Environment Variables** (in the left sidebar)

### Step 3: Add MONGODB_URI
1. Click **Add New** button
2. Fill in:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://elite:YOUR_PASSWORD@cluster0.7o5qjhc.mongodb.net/helio-aegis?retryWrites=true&w=majority&appName=Cluster0`
   - **Environments**: Check all three boxes:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
3. Click **Save**

⚠️ **Replace `YOUR_PASSWORD`** with your actual MongoDB password!

### Step 4: Add AUTH_SECRET
1. Click **Add New** button again
2. Generate a secret by running this in your terminal:
   ```bash
   openssl rand -base64 32
   ```
3. Fill in:
   - **Name**: `AUTH_SECRET`
   - **Value**: (paste the output from the command above)
   - **Environments**: Check all three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
4. Click **Save**

### Step 5: Add NEXTAUTH_URL
1. Click **Add New** button again
2. Fill in:
   - **Name**: `NEXTAUTH_URL`
   - **Value**: `https://your-project-name.vercel.app`
   - **Environments**: Check all three boxes:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. Click **Save**

⚠️ **Replace `your-project-name`** with your actual Vercel project URL!

### Step 6: Redeploy
1. Go to **Deployments** tab (top navigation)
2. Find the latest deployment (top of the list)
3. Click the **three dots (•••)** on the right side
4. Click **Redeploy**
5. Wait 2-3 minutes for the build to complete

---

## 🔑 Get Your MongoDB Password

If you don't have your MongoDB password:

1. Go to: https://cloud.mongodb.com
2. Sign in
3. Click **Database Access** (left sidebar)
4. Find the user: `elite`
5. Click **Edit** button
6. Click **Edit Password**
7. Choose one:
   - **Autogenerate Secure Password** (recommended)
   - Or enter your own password
8. **IMPORTANT**: Copy and save the password somewhere safe!
9. Click **Update User**
10. Use this password in the `MONGODB_URI` value in Vercel

---

## 📋 Quick Checklist

Before redeploying, verify you have:

- [ ] Added `MONGODB_URI` with correct password
- [ ] Added `AUTH_SECRET` (generated with openssl)
- [ ] Added `NEXTAUTH_URL` with your Vercel URL
- [ ] All three variables have all environments checked (Production, Preview, Development)
- [ ] Clicked **Save** for each variable

---

## 🎯 Expected Result

After redeploying with environment variables:
- ✅ Build completes successfully
- ✅ No "MONGODB_URI" error
- ✅ Site is live at your Vercel URL
- ✅ Can access homepage
- ✅ Can access admin at `/admin/login`

---

## 🆘 Still Having Issues?

### Error: "Invalid connection string"
- Check for typos in MONGODB_URI
- Ensure password doesn't contain special characters that need URL encoding
- Verify the database name is `helio-aegis`

### Error: "Authentication failed"
- Password is incorrect
- Reset password in MongoDB Atlas
- Update MONGODB_URI in Vercel with new password

### Error: "Network timeout"
- Check MongoDB Atlas Network Access
- Ensure IP whitelist includes `0.0.0.0/0` (allow from anywhere)

---

## 📸 Visual Guide

```
Vercel Dashboard
└── Your Project (helio-aegis-website)
    └── Settings (top nav)
        └── Environment Variables (left sidebar)
            └── Add New (button)
                ├── Name: MONGODB_URI
                ├── Value: mongodb+srv://...
                └── Environments: ✓ All three
                    └── Save
```

---

## ⚡ Quick Commands

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

Test MongoDB connection locally:
```bash
# Add to .env.local first, then:
npm run dev
```

---

**After adding all variables and redeploying, your site will work! 🚀**

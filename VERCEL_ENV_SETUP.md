# Set Up Vercel Environment Variables

## Your MongoDB Connection String

Based on your error, your MongoDB connection string is:
```
mongodb+srv://elite:<db_password>@cluster0.7o5qjhc.mongodb.net/?appName=Cluster0
```

You need to:
1. Replace `<db_password>` with your actual MongoDB password
2. Add the database name: `/helio-aegis`

**Final connection string:**
```
mongodb+srv://elite:YOUR_ACTUAL_PASSWORD@cluster0.7o5qjhc.mongodb.net/helio-aegis?retryWrites=true&w=majority&appName=Cluster0
```

---

## Add to Vercel (Step-by-Step)

### 1. Go to Vercel Project Settings
```
https://vercel.com/dashboard
→ Click your project (helio-aegis-website)
→ Settings (top nav)
→ Environment Variables (left sidebar)
```

### 2. Add These Variables

Click "Add New" for each:

#### Variable 1: MONGODB_URI
- **Name**: `MONGODB_URI`
- **Value**: `mongodb+srv://elite:YOUR_PASSWORD@cluster0.7o5qjhc.mongodb.net/helio-aegis?retryWrites=true&w=majority&appName=Cluster0`
- **Environment**: ✓ Production ✓ Preview ✓ Development
- Click **Save**

#### Variable 2: AUTH_SECRET
- **Name**: `AUTH_SECRET`
- **Value**: Run this command to generate:
  ```bash
  openssl rand -base64 32
  ```
  Copy the output and paste it
- **Environment**: ✓ Production ✓ Preview ✓ Development
- Click **Save**

#### Variable 3: NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://your-project-name.vercel.app`
  (Replace with your actual Vercel URL)
- **Environment**: ✓ Production ✓ Preview ✓ Development
- Click **Save**

### 3. Redeploy
After adding all variables:
1. Go to **Deployments** tab
2. Click **•••** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes

---

## Get Your MongoDB Password

If you don't remember your MongoDB password:

1. Go to https://cloud.mongodb.com
2. Click **Database Access** (left sidebar)
3. Find user `elite`
4. Click **Edit**
5. Click **Edit Password**
6. Generate new password or enter your own
7. Click **Update User**
8. Copy the password
9. Update `MONGODB_URI` in Vercel with the new password

---

## Verify It Works

After redeploying:
1. Visit: `https://your-site.vercel.app`
2. Should see the homepage (no errors)
3. Go to: `https://your-site.vercel.app/admin/login`
4. Create admin user (see DEPLOY_NOW.md)
5. Login and test!

---

## Quick Reference

**Only 3 environment variables needed:**
- `MONGODB_URI` - Your MongoDB connection
- `AUTH_SECRET` - Random 32-char string
- `NEXTAUTH_URL` - Your Vercel URL

**No Cloudinary needed!** Images are stored in MongoDB as base64.

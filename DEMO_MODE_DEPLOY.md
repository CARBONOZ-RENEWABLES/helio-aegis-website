# Deploy to Vercel in DEMO MODE (No Database Required)

## 🎭 What is Demo Mode?

Demo mode allows you to test the website on Vercel **without setting up MongoDB**. Perfect for quick testing!

---

## 🚀 Deploy in 2 Minutes

### Step 1: Go to Vercel
1. Open: https://vercel.com/dashboard
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select: `CARBONOZ-RENEWABLES/helio-aegis-website`
5. Click "Import"

### Step 2: Add ONE Environment Variable
1. Click "Environment Variables"
2. Add:
   - **Name**: `DEMO_MODE`
   - **Value**: `true`
   - **Environments**: ✅ Production ✅ Preview ✅ Development
3. Click **Save**

### Step 3: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Done! 🎉

---

## ✅ What Works in Demo Mode

- ✅ Homepage with all sections
- ✅ Navigation menu
- ✅ All pages load correctly
- ✅ Responsive design
- ✅ All UI components
- ✅ Static content display

## ❌ What Doesn't Work in Demo Mode

- ❌ Admin panel (requires database)
- ❌ Content management (requires database)
- ❌ Dynamic data updates (uses demo data)
- ❌ User authentication (requires database)

---

## 🔄 Switch to Full Mode Later

When ready to use the full CMS:

1. Set up MongoDB Atlas (free tier)
2. Add these environment variables in Vercel:
   ```
   MONGODB_URI=mongodb+srv://...
   AUTH_SECRET=<generate-with-openssl>
   NEXTAUTH_URL=https://your-site.vercel.app
   ```
3. Remove or set `DEMO_MODE=false`
4. Redeploy

---

## 📝 Demo Data

Demo mode uses hardcoded data from `/lib/demo-data.ts`:
- Homepage content
- Navigation links
- Sample projects
- Sample insights
- Metrics and stats

---

## 🎯 Perfect For:

- ✅ Testing deployment
- ✅ Showing design to clients
- ✅ Frontend development
- ✅ UI/UX testing
- ✅ Quick demos

---

## 🆘 Troubleshooting

### Build still fails?
- Make sure `DEMO_MODE=true` is set
- Check all environments are selected
- Redeploy after adding variable

### Want to test admin panel?
- You need full mode with MongoDB
- See `VERCEL_DEPLOYMENT_SIMPLE.md`

---

**Your demo site will be live at: `https://your-project.vercel.app`** 🚀

No database setup required!

# Environment Setup Instructions

## 🔒 Security First

**NEVER commit passwords to GitHub!** 

Your `.env.local` file is in `.gitignore` and will NOT be pushed to GitHub.

---

## For Vercel (Production)

### Add Environment Variables in Vercel Dashboard:

1. Go to: https://vercel.com/dashboard
2. Select your project: `helio-aegis-website`
3. Click: **Settings** → **Environment Variables**
4. Add these 3 variables:

#### 1. MONGODB_URI
```
mongodb+srv://elite:YOUR_PASSWORD@cluster0.7o5qjhc.mongodb.net/helio-aegis?retryWrites=true&w=majority&appName=Cluster0
```
- Replace `YOUR_PASSWORD` with your actual MongoDB password
- Check: ✓ Production ✓ Preview ✓ Development

#### 2. AUTH_SECRET
```bash
# Generate this by running:
openssl rand -base64 32
```
- Copy the output and paste it as the value
- Check: ✓ Production ✓ Preview ✓ Development

#### 3. NEXTAUTH_URL
```
https://your-project-name.vercel.app
```
- Replace with your actual Vercel URL
- Check: ✓ Production ✓ Preview ✓ Development

### Then Redeploy:
1. Go to **Deployments** tab
2. Click **•••** (three dots) on latest deployment
3. Click **Redeploy**

---

## For Local Development

### 1. Edit `.env.local` file

Open the file and replace the placeholders:

```bash
# Edit this file
nano .env.local

# Or use any text editor
code .env.local
```

### 2. Get Your MongoDB Password

If you don't have it:
1. Go to: https://cloud.mongodb.com
2. Click **Database Access**
3. Find user `elite`
4. Click **Edit** → **Edit Password**
5. Set new password (save it!)
6. Update `.env.local` with this password

### 3. Generate AUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and paste it in `.env.local`

### 4. Test Locally

```bash
npm run dev
```

Visit: http://localhost:3000

---

## ✅ Verification Checklist

### Vercel (Production):
- [ ] MONGODB_URI added
- [ ] AUTH_SECRET added
- [ ] NEXTAUTH_URL added
- [ ] Redeployed
- [ ] Site loads without errors

### Local Development:
- [ ] `.env.local` created
- [ ] MongoDB password updated
- [ ] AUTH_SECRET generated
- [ ] `npm run dev` works
- [ ] Can access http://localhost:3000

---

## 🆘 Troubleshooting

### "MONGODB_URI not defined" error
- Check environment variables are saved in Vercel
- Redeploy after adding variables
- Verify no typos in variable names

### Can't connect to MongoDB
- Verify password is correct
- Check IP whitelist includes 0.0.0.0/0
- Ensure database name is `helio-aegis`

### AUTH_SECRET issues
- Must be at least 32 characters
- Generate with `openssl rand -base64 32`
- No spaces or special characters that need escaping

---

## 📝 Important Notes

1. **`.env.local` is NOT committed to GitHub** (it's in `.gitignore`)
2. **Production uses Vercel environment variables** (not `.env.local`)
3. **Never share your passwords** in chat, email, or commits
4. **Each environment has its own variables** (local vs production)

---

## Next Steps

1. ✅ Set up Vercel environment variables
2. ✅ Redeploy on Vercel
3. ✅ Create admin user (see DEPLOY_NOW.md)
4. ✅ Login and test!

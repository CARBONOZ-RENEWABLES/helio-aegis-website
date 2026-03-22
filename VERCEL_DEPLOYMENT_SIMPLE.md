# Deploying Helio Aegis to Vercel

## Prerequisites
- GitHub account with the repository: `CARBONOZ-RENEWABLES/helio-aegis-website`
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (for production database)

## Step 1: Set Up MongoDB Atlas (Production Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0 Sandbox)
3. Create a database user:
   - Click "Database Access" → "Add New Database User"
   - Username: `helioaegis`
   - Password: Generate a secure password
   - Database User Privileges: "Read and write to any database"
4. Whitelist all IPs:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Get your connection string:
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://helioaegis:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password

## Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `CARBONOZ-RENEWABLES/helio-aegis-website`
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. **Add Environment Variables**:
   Click "Environment Variables" and add the following:

   ```
   MONGODB_URI=mongodb+srv://helioaegis:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/helio-aegis?retryWrites=true&w=majority
   AUTH_SECRET=<generate-with-openssl-rand-base64-32>
   NEXTAUTH_URL=https://your-project-name.vercel.app
   ```

   Optional (for market ticker):
   ```
   NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key
   ```

   **To generate AUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

6. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at `https://your-project-name.vercel.app`

## Step 3: Create Admin User

After deployment, create the initial admin user in MongoDB:

### Option A: Using MongoDB Atlas Web Interface

1. Go to MongoDB Atlas → Browse Collections
2. Select your database: `helio-aegis`
3. Create collection: `users`
4. Insert Document:

```json
{
  "name": "Admin",
  "email": "admin@helioaegis.com",
  "hashedPassword": "$2a$10$YourHashedPasswordHere",
  "role": "super_admin",
  "permissions": {
    "canManageUsers": true,
    "canManageContent": true,
    "canPublish": true,
    "canDelete": true
  },
  "isActive": true,
  "createdAt": { "$date": "2025-01-01T00:00:00.000Z" }
}
```

### Generate Password Hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123!', 10))"
```

Copy the output and replace `$2a$10$YourHashedPasswordHere` in the JSON above.

## Step 4: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `helioaegis.com`)
4. Follow Vercel's instructions to update your DNS records
5. Update `NEXTAUTH_URL` environment variable to your custom domain

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `AUTH_SECRET` | Yes | NextAuth secret (32+ characters) |
| `NEXTAUTH_URL` | Yes | Your site URL |
| `NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY` | No | For market ticker (optional) |

## Post-Deployment Checklist

- [ ] Visit your site: `https://your-domain.vercel.app`
- [ ] Test admin login: `https://your-domain.vercel.app/admin/login`
- [ ] Verify all pages load correctly
- [ ] Test image uploads in admin panel (stored as base64 in MongoDB)
- [ ] Check navigation management at `/admin/navigation`
- [ ] Verify mobile responsiveness
- [ ] Test all CMS features

## Image Storage

Images are stored as **base64 strings directly in MongoDB**. This means:
- ✅ No external service needed
- ✅ Simple deployment
- ✅ All data in one place
- ⚠️ Keep images under 2MB for best performance

## Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Ensure all environment variables are set
- Verify MongoDB connection string is correct

### Can't Login to Admin
- Verify user exists in MongoDB
- Check password hash is correct
- Ensure `AUTH_SECRET` is set

### Images Not Uploading
- Check browser console for errors
- Verify image size is under 5MB
- MongoDB documents have 16MB limit

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has correct permissions

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Monitoring

- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → View Function Logs
- **Performance**: Vercel Dashboard → Speed Insights

---

**Your Helio Aegis website is now live! 🚀**

Access your admin panel at: `https://your-domain.vercel.app/admin/login`

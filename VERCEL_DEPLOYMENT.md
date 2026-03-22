# Deploying Helio Aegis to Vercel

## Prerequisites
- GitHub account with the repository: `CARBONOZ-RENEWABLES/helio-aegis-website`
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (for production database)
- Cloudinary account (for image uploads)

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

### Option A: Deploy via Vercel Dashboard (Recommended)

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
   # MongoDB
   MONGODB_URI=mongodb+srv://helioaegis:<password>@cluster0.xxxxx.mongodb.net/helio-aegis?retryWrites=true&w=majority

   # NextAuth
   AUTH_SECRET=<generate-random-32-char-string>
   NEXTAUTH_URL=https://your-domain.vercel.app

   # Cloudinary (for image uploads)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Optional: Alpha Vantage (for market ticker)
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

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/elite/Desktop/helio-aegis-website
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? helio-aegis-website
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add MONGODB_URI
vercel env add AUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
vercel env add NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

# Deploy to production
vercel --prod
```

## Step 3: Set Up Cloudinary (Image Uploads)

1. Go to https://cloudinary.com and sign up
2. Get your credentials from the Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Create an upload preset:
   - Go to Settings → Upload
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Preset name: `helio-aegis`
   - Signing Mode: "Unsigned"
   - Folder: `helio-aegis`
   - Click "Save"
4. Add these to Vercel environment variables (see Step 2)

## Step 4: Seed Initial Data

After deployment, you need to create the initial admin user:

1. **Option A: Use MongoDB Compass**
   - Connect to your MongoDB Atlas cluster
   - Create a new database: `helio-aegis`
   - Create a collection: `users`
   - Insert a document:
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

2. **Option B: Use the seed script locally**
   ```bash
   # Update .env.local with production MongoDB URI
   MONGODB_URI=your_production_mongodb_uri npm run seed
   ```

3. **Generate hashed password**:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('YourPassword123!', 10))"
   ```

## Step 5: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `helioaegis.com`)
4. Follow Vercel's instructions to update your DNS records
5. Update `NEXTAUTH_URL` environment variable to your custom domain

## Step 6: Post-Deployment Checklist

- [ ] Visit your site: `https://your-domain.vercel.app`
- [ ] Test admin login: `https://your-domain.vercel.app/admin/login`
- [ ] Verify all pages load correctly
- [ ] Test image uploads in admin panel
- [ ] Check navigation management at `/admin/navigation`
- [ ] Verify mobile responsiveness
- [ ] Test all CMS features

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `AUTH_SECRET` | Yes | NextAuth secret (32+ characters) |
| `NEXTAUTH_URL` | Yes | Your site URL |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Yes | Cloudinary upload preset |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY` | No | For market ticker (optional) |

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
- Verify Cloudinary credentials
- Check upload preset is "unsigned"
- Ensure CORS is enabled in Cloudinary

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has correct permissions

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

To disable auto-deploy:
1. Go to Project Settings → Git
2. Uncheck "Production Branch"

## Monitoring

- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → View Function Logs
- **Performance**: Vercel Dashboard → Speed Insights

## Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Cloudinary Docs: https://cloudinary.com/documentation

---

**Your Helio Aegis website is now live! 🚀**

Access your admin panel at: `https://your-domain.vercel.app/admin/login`

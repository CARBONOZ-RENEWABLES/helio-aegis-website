# 📸 Image Upload Setup Guide

## Cloudinary Configuration

The image upload feature uses Cloudinary for storing project images. Follow these steps to set it up:

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account
3. Verify your email

## Step 2: Get Your Credentials

1. Login to Cloudinary Dashboard
2. You'll see your credentials on the dashboard:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## Step 3: Create Upload Preset

1. In Cloudinary Dashboard, go to **Settings** (gear icon)
2. Click **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure:
   - **Preset name**: `helio-aegis`
   - **Signing Mode**: `Unsigned` (important!)
   - **Folder**: `helio-aegis/projects`
   - **Allowed formats**: `jpg, png, webp`
   - **Max file size**: `5 MB`
   - **Transformation**: 
     - Quality: `auto`
     - Format: `auto`
6. Click **Save**

## Step 4: Update Environment Variables

Add to your `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Replace `your-cloud-name`, `your-api-key`, and `your-api-secret` with your actual credentials.

## Step 5: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

## Step 6: Test Upload

1. Go to http://localhost:3000/admin/projects/new
2. You should see an "Upload Image" section
3. Click to upload or drag & drop an image
4. Image should upload and show preview

---

## Troubleshooting

### "Upload failed" error

**Check:**
- ✅ Cloud name is correct in `.env.local`
- ✅ Upload preset name is exactly `helio-aegis`
- ✅ Upload preset signing mode is `Unsigned`
- ✅ Restarted dev server after adding env variables

### Image not showing after upload

**Check:**
- ✅ Image URL is valid (check browser console)
- ✅ Cloudinary account is active
- ✅ Image format is supported (jpg, png, webp)

### "Invalid cloud name" error

**Fix:**
- Double-check `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local`
- Make sure there are no spaces or quotes
- Restart dev server

---

## Alternative: Use Image URLs

If you don't want to set up Cloudinary right now, you can:

1. Upload images to any image hosting service (Imgur, Unsplash, etc.)
2. Copy the image URL
3. Paste the URL directly in the "Hero Image" field (we'll add a URL input option)

---

## Image Recommendations

### Hero Image
- **Size**: 1200x600px (2:1 ratio)
- **Format**: JPG or WebP
- **File size**: < 500KB
- **Content**: High-quality project photos

### Best Practices
- ✅ Use landscape orientation
- ✅ Optimize images before upload
- ✅ Use descriptive filenames
- ✅ Ensure good lighting and clarity
- ✅ Avoid text overlays (design handles that)

---

## Free Image Sources

If you need placeholder images:

- **Unsplash**: https://unsplash.com/s/photos/solar-energy
- **Pexels**: https://www.pexels.com/search/renewable-energy/
- **Pixabay**: https://pixabay.com/images/search/wind-turbine/

---

## Next Steps

Once Cloudinary is configured:
1. Create a new project
2. Upload a hero image
3. Fill in project details
4. Publish and view on website

---

**Need Help?** Check the Cloudinary documentation: https://cloudinary.com/documentation

# ✅ Image Upload Feature - Added

## What Was Added

Image upload functionality has been added to both the **New Project** and **Edit Project** forms.

---

## Features

### 1. Upload from Computer
- Click or drag & drop images
- Uploads to Cloudinary
- Shows upload progress
- Displays preview after upload
- Remove and re-upload option

### 2. Paste Image URL
- Alternative to uploading
- Click "Or paste image URL"
- Paste any image URL
- Instant preview
- Perfect for using stock photos

---

## How to Use

### Option A: Upload from Computer

1. Go to `/admin/projects/new` or edit existing project
2. See "Project Image" section at top
3. Click the upload area or drag & drop image
4. Wait for upload (shows spinner)
5. Preview appears when done
6. Continue filling form

### Option B: Use Image URL

1. Go to `/admin/projects/new` or edit existing project
2. Click **"Or paste image URL"** button
3. Paste image URL (e.g., from Unsplash)
4. Click **"Add"**
5. Preview appears
6. Continue filling form

---

## Setup Required (Option A Only)

To use the upload feature, you need to configure Cloudinary:

### Quick Setup (5 minutes)

1. Create free Cloudinary account: https://cloudinary.com/users/register_free
2. Get your Cloud Name from dashboard
3. Create upload preset named `helio-aegis` (unsigned mode)
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   ```
5. Restart dev server

**Full instructions:** See `IMAGE_UPLOAD_SETUP.md`

---

## No Setup Required (Option B)

If you don't want to set up Cloudinary:

1. Use the **"Or paste image URL"** option
2. Get images from:
   - Unsplash: https://unsplash.com
   - Pexels: https://pexels.com
   - Your own hosting
3. Copy image URL
4. Paste in the form

---

## Image Recommendations

### Size
- **Recommended**: 1200x600px (2:1 ratio)
- **Minimum**: 800x400px
- **Format**: JPG, PNG, or WebP
- **File size**: < 500KB for best performance

### Quality
- High resolution
- Good lighting
- Professional appearance
- Landscape orientation
- No text overlays (design adds those)

---

## Where Images Appear

1. **Project List** - Small thumbnail (128x128px)
2. **Homepage** - Featured projects section (800x600px)
3. **Portfolio Page** - Project cards (800x600px)
4. **Project Detail** - Hero image (1200x600px full width)

---

## Files Modified

```
✅ components/admin/ImageUpload.tsx (NEW)
✅ app/admin/projects/new/page.tsx (updated)
✅ components/admin/EditProjectForm.tsx (updated)
✅ IMAGE_UPLOAD_SETUP.md (NEW)
```

---

## Testing

### Test Upload Feature
1. Go to http://localhost:3000/admin/projects/new
2. See "Project Image" section
3. Try uploading an image
4. Verify preview appears
5. Submit form
6. Check image on public site

### Test URL Feature
1. Go to http://localhost:3000/admin/projects/new
2. Click "Or paste image URL"
3. Paste: `https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=1200&h=600&fit=crop`
4. Click "Add"
5. Verify preview appears
6. Submit form

---

## Troubleshooting

### Upload not working?
- Check Cloudinary setup (see `IMAGE_UPLOAD_SETUP.md`)
- Verify upload preset is `helio-aegis`
- Ensure preset is in "unsigned" mode
- Check browser console for errors

### URL not working?
- Verify URL is a direct image link
- Check URL ends in .jpg, .png, or .webp
- Try opening URL in new tab to verify it works
- Ensure URL is publicly accessible

### Image not showing on website?
- Check project status is "Published"
- Verify image URL is valid
- Clear browser cache
- Check browser console for errors

---

## Free Image Sources

### Renewable Energy Photos
- **Unsplash**: https://unsplash.com/s/photos/solar-energy
- **Pexels**: https://www.pexels.com/search/renewable-energy/
- **Pixabay**: https://pixabay.com/images/search/wind-turbine/

### Example URLs (ready to use)
```
Solar:
https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=1200&h=600&fit=crop

Wind:
https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=600&fit=crop

Storage:
https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop

Hydrogen:
https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop
```

---

## Summary

✅ **Upload from computer** - Requires Cloudinary setup
✅ **Paste image URL** - Works immediately, no setup
✅ **Preview before save** - See image before submitting
✅ **Remove and replace** - Easy to change images
✅ **Works on new and edit** - Consistent experience

**Recommendation:** Start with URL option, set up Cloudinary later for production.

---

**Status:** ✅ Complete and Ready to Use

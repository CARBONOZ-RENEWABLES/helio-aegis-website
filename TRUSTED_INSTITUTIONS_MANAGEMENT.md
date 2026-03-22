# Trusted Institutions Management

## Overview

The admin interface now allows you to manage the "Trusted by Leading Institutions" section on the homepage, including partner institutions and certifications.

## Features

### Institution Management
- **Short Name**: Display text when no logo is uploaded (e.g., "GS", "JPM")
- **Full Name**: Full institution name (e.g., "Goldman Sachs", "JP Morgan")
- **Logo Upload**: Optional logo image upload via Cloudinary
- **Order**: Automatic ordering based on position in list

### Certification Management
- **Icon**: Emoji or symbol (e.g., ✓, ⭐, 🌍)
- **Label**: Certification name (e.g., "ISO 14001", "GRESB 5-Star")
- **Order**: Automatic ordering based on position in list

## Access

Navigate to: `/admin/homepage`

Scroll to the **"Trusted Institutions"** section

## How to Use

### Adding an Institution

1. Click **"+ Add Institution"**
2. Enter the **Short Name** (e.g., "GS")
3. Enter the **Full Name** (e.g., "Goldman Sachs")
4. Optionally upload a logo image
5. Click **"Save Changes"**

### Uploading a Logo

1. Click **"Choose File"** in the Logo Image section
2. Select an image file (PNG, JPG, or SVG recommended)
3. The image will be uploaded to Cloudinary
4. If no logo is uploaded, the short name will be displayed instead

### Removing an Institution

1. Click the **"Remove"** button next to the institution
2. Click **"Save Changes"**

### Adding a Certification

1. Click **"+ Add Certification"**
2. Enter an **Icon** (emoji or symbol)
3. Enter the **Label** (certification name)
4. Click **"Save Changes"**

### Removing a Certification

1. Click the **"Remove"** button next to the certification
2. Click **"Save Changes"**

### Editing the Section Headline

1. Update the **"Section Headline"** field
2. Default: "Trusted by leading institutions"
3. Click **"Save Changes"**

## Display Behavior

### With Logo
- Logo image is displayed (grayscale by default)
- Hover effect: Logo becomes full color
- Full name appears below the logo

### Without Logo
- Short name is displayed in monospace font
- Hover effect: Text changes to solar color
- Full name appears below the short name

## Default Institutions

The system comes pre-configured with:
- Goldman Sachs (GS)
- JP Morgan (JPM)
- Wells Fargo (WF)
- Rabobank (RB)
- ING
- MUFG
- Brookfield (BEP)
- Ørsted (ORSTED)

## Default Certifications

The system comes pre-configured with:
- ✓ ISO 14001
- ⭐ GRESB 5-Star
- 🌍 UN PRI Signatory

## Technical Details

### Database Schema

```typescript
partnersSection: {
  headline: string;
  institutions: Array<{
    shortName: string;
    fullName: string;
    logo?: string;
    order: number;
  }>;
  certifications: Array<{
    icon: string;
    label: string;
    order: number;
  }>;
}
```

### Components

- **PartnersCredentialsServer.tsx**: Server component that fetches data from MongoDB
- **PartnersCredentialsClient.tsx**: Client component with animations and interactions
- **HomepageEditorForm.tsx**: Admin form for managing institutions

### API Endpoint

- **PUT /api/admin/homepage**: Updates all homepage content including partners section

## Image Recommendations

### Logo Images
- **Format**: PNG with transparent background (preferred) or SVG
- **Size**: 200x200px minimum
- **Aspect Ratio**: Square or horizontal
- **Color**: Full color (grayscale filter applied automatically)
- **File Size**: Under 100KB for optimal performance

## Best Practices

1. **Logo Consistency**: Use either all logos or all text abbreviations for visual consistency
2. **Short Names**: Keep to 2-6 characters for best display
3. **Full Names**: Use official company names
4. **Certifications**: Use recognizable icons/emojis
5. **Order**: Arrange by prominence or alphabetically

## Troubleshooting

### Logo Not Displaying
- Ensure the image was successfully uploaded to Cloudinary
- Check that the URL is valid and accessible
- Verify the image format is supported (PNG, JPG, SVG)

### Changes Not Appearing
- Click "Save Changes" after making edits
- Refresh the homepage to see updates
- Check browser console for any errors

## Support

For technical issues or questions:
- Check the CMS documentation
- Review the audit log at `/admin/audit-log`
- Contact technical support

---

**Last Updated**: 2025
**Version**: 1.0

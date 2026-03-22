# Team Management Guide

## Overview

The `/admin/team` interface allows you to manage team members displayed on the About page. Add, edit, and remove team members with optional profile photos.

---

## 📍 Access

Navigate to: `/admin/team`

Preview changes: Click "Preview About Page" button (opens `/about` in new tab)

---

## 🎯 Features

### Team Member Management
- Add new team members
- Edit existing team members
- Delete team members
- Upload optional profile photos
- Set display order
- Publish/draft status

---

## 📝 Team Member Fields

### Basic Information:
- **Full Name** (required): Team member's full name
- **Title** (required): Job title or position
- **Bio** (required): Professional background and experience

### Profile Image:
- **Profile Photo** (optional): Square format recommended
- If no image uploaded, default avatar (👤) is displayed

### Expertise Areas:
- **Expertise** (optional): List of specialization areas
- Add multiple expertise tags
- Displayed as tags below bio

### Settings:
- **Display Order**: Controls position on page (lower numbers first)
- **Status**: Draft or Published

---

## 🚀 How to Use

### Adding a Team Member:

1. Navigate to `/admin/team`
2. Click **"+ Add Team Member"**
3. Fill in required fields:
   - Full Name
   - Title
   - Bio
4. Optionally:
   - Upload profile photo
   - Add expertise areas
   - Set display order
5. Choose status (Draft or Published)
6. Click **"Create"**

### Editing a Team Member:

1. Navigate to `/admin/team`
2. Click on the team member card
3. Update any fields
4. Click **"Update"**

### Deleting a Team Member:

1. Navigate to `/admin/team`
2. Click on the team member card
3. Click **"Delete"** button at bottom
4. Confirm deletion

### Uploading a Profile Photo:

1. In the team member form, find "Profile Image" section
2. Click **"Choose File"**
3. Select image (PNG, JPG, or SVG)
4. Image uploads to Cloudinary automatically
5. Save the team member

### Adding Expertise Areas:

1. In the team member form, find "Expertise Areas" section
2. Enter expertise in the field (e.g., "Project Finance")
3. Click **"+ Add Expertise"** to add more
4. Click **"Remove"** to delete an expertise
5. Save the team member

### Setting Display Order:

1. In the team member form, find "Display Order" field
2. Enter a number (0, 1, 2, etc.)
3. Lower numbers appear first on the page
4. Save the team member

---

## 🎨 Display on About Page

### With Profile Photo:
- Photo displayed in square container
- Name and title below photo
- Bio text
- Expertise tags at bottom

### Without Profile Photo:
- Default avatar icon (👤) displayed
- Same layout as with photo

### Card Layout:
```
[PHOTO/AVATAR]

[NAME]
[TITLE]

[BIO]

[EXPERTISE TAG] [EXPERTISE TAG] [EXPERTISE TAG]
```

---

## 📊 Best Practices

### Profile Photos:
- **Format**: PNG or JPG with transparent/solid background
- **Size**: 400x400px minimum
- **Aspect Ratio**: Square (1:1)
- **File Size**: Under 2MB
- **Style**: Professional headshots work best

### Writing Bios:
- Keep to 2-3 sentences
- Include years of experience
- Mention key achievements or background
- Use professional tone
- Example: "20+ years in renewable energy finance and project development. Former Managing Director at Goldman Sachs."

### Expertise Areas:
- Keep tags short (1-3 words)
- Use 3-5 expertise areas per person
- Be specific (e.g., "Project Finance" not "Finance")
- Use consistent terminology across team

### Display Order:
- 0 = First position
- Typically order by seniority or importance
- C-suite executives usually first (0-5)
- Department heads next (6-10)
- Other team members after (11+)

---

## 🔧 Status Management

### Draft Status:
- Team member saved but not visible on About page
- Use for incomplete profiles
- Allows you to prepare content before publishing

### Published Status:
- Team member visible on About page
- Appears in order specified
- Immediately visible to public

---

## 📱 Responsive Display

The team section is fully responsive:
- **Desktop**: 3 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column

All design elements are preserved across devices.

---

## 🚨 Troubleshooting

### Team Member Not Appearing:
1. Check status is set to "Published"
2. Refresh the About page
3. Clear browser cache
4. Verify MongoDB connection

### Profile Photo Not Displaying:
1. Ensure image was successfully uploaded
2. Check Cloudinary credentials in `.env.local`
3. Verify image URL is valid
4. Try re-uploading the image

### Changes Not Saving:
1. Check all required fields are filled
2. Verify you're logged in as admin
3. Check browser console for errors
4. Try refreshing the page

---

## 💡 Tips

### Creating a Strong Team Page:

1. **Consistency**: Use similar photo styles for all team members
2. **Completeness**: Fill in all fields for professional appearance
3. **Order**: Arrange by organizational hierarchy
4. **Updates**: Keep bios current with latest achievements
5. **Expertise**: Use consistent terminology across team

### Photo Guidelines:

- Use professional headshots
- Consistent background style
- Similar lighting and framing
- Square crop for best display
- High resolution for clarity

### Bio Writing:

- Start with years of experience
- Include previous notable positions
- Mention key achievements
- Keep professional and concise
- Avoid first person ("I", "my")

---

## 🔐 Permissions

### Required Permissions:
- Must be logged in as admin
- Editor role can create/edit team members
- Super admin can delete team members

### Audit Trail:
- All changes are logged
- View audit log at `/admin/audit-log`
- Includes who made changes and when

---

## 📞 Support

For technical issues:
- Check audit log: `/admin/audit-log`
- Review CMS documentation
- Contact technical support

---

## 🎯 Default Team Members

If no team members are added, the About page displays 6 default team members:
- Sarah Chen - CEO
- Michael Rodriguez - CIO
- Dr. James Wilson - CTO
- Lisa Martinez - COO
- David Thompson - Head of Project Development
- Jennifer Park - Head of Investor Relations

These are placeholders and should be replaced with actual team members.

---

**Last Updated**: 2025
**Version**: 1.0
**Module**: Team Management

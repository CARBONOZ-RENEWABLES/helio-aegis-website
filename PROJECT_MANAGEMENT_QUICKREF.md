# 🚀 Quick Reference - Project Management

## Access Admin Panel

```
URL: http://localhost:3000/admin/login
Navigate: Sidebar → Projects
```

## Quick Actions

### Create New Project
1. Click **"+ New Project"**
2. Fill required fields (name, capacity, location)
3. Click **"Create Project"**
4. Edit full details
5. Change status to **"Published"**
6. Save

### Edit Project
1. Find project in list
2. Click **Edit** icon (pencil)
3. Update fields
4. Click **"Save Changes"**

### Delete Project
1. Find project in list
2. Click **Delete** icon (trash)
3. Confirm deletion

### Feature on Homepage
1. Edit project
2. Check **"Featured on homepage"**
3. Change status to **"Published"**
4. Save

## Project Statuses

| Status | Visibility | Use Case |
|--------|-----------|----------|
| **Draft** | ❌ Not visible | Work in progress |
| **Published** | ✅ Visible | Live on website |
| **Archived** | ❌ Not visible | Soft deleted |

## Where Projects Appear

| Location | Condition | Limit |
|----------|-----------|-------|
| Homepage | Featured + Published | 4 projects |
| Portfolio Page | Published | All |
| Detail Page | Published | Individual |

## Required Fields

- ✅ Project Name
- ✅ Technology (Solar, Wind, Storage, Hydrogen, Hybrid)
- ✅ Capacity (MW)
- ✅ Location (City, Country, Region)
- ✅ Short Description (max 160 chars)

## Design System (Locked)

**Cannot be changed through admin:**
- Colors (void, obsidian, solar, hydrogen, growth)
- Fonts (Playfair Display, DM Sans, JetBrains Mono)
- Layout (cards, grids, spacing)

**Can be changed through admin:**
- All text content
- Images
- Project data
- Metadata

## Best Practices

✅ Keep descriptions under 160 characters
✅ Use high-quality images (1200x600px)
✅ Fill all SEO fields
✅ Set proper project order
✅ Use draft status until ready
✅ Archive instead of delete

## Troubleshooting

**Project not showing?**
- Check status is "Published"
- Clear browser cache
- Verify slug is unique

**Images not loading?**
- Check image URL
- Verify Cloudinary config
- Re-upload image

**Featured not working?**
- Enable "Featured" toggle
- Set status to "Published"
- Check project order

## Support

📖 Full Guide: `PROJECT_MANAGEMENT_GUIDE.md`
🔧 Setup: `CMS_QUICKSTART.md`
📋 Implementation: `PROJECT_MANAGEMENT_IMPLEMENTATION.md`

---

**Quick Tip:** Always save as Draft first, review, then Publish!

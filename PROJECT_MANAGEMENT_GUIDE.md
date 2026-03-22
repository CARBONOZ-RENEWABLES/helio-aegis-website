# 📋 Project Management Guide

## Overview

The admin panel at `/admin/projects` allows you to manage all portfolio projects displayed on the website. You can create, edit, delete, and publish projects while maintaining the existing design system.

## Key Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete projects
✅ **Content Management** - Edit project details, descriptions, and metadata
✅ **Media Management** - Upload and manage project images
✅ **Status Control** - Draft, Published, or Archived
✅ **Featured Projects** - Mark projects to appear on homepage
✅ **Design Lock** - Colors, fonts, and layout remain unchanged

---

## Accessing the Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Login with your credentials
3. Click "Projects" in the sidebar

---

## Managing Projects

### Creating a New Project

1. Click **"+ New Project"** button
2. **Upload Project Image**:
   - Click to upload from computer, OR
   - Click "Or paste image URL" to use an existing image URL
3. Fill in the basic information:
   - **Project Name** (required)
   - **URL Slug** (auto-generated if left empty)
   - **Short Description** (max 160 characters)
   - **Technology** (Solar, Wind, Storage, Hydrogen, Hybrid)
   - **Capacity (MW)** (required)
   - **Location** (City, Country, Region)
3. Click **"Create Project"**
4. You'll be redirected to the full edit page

### Editing an Existing Project

1. Find the project in the list
2. Click the **Edit** icon (pencil)
3. Update any fields:
   - **Project Image** (upload new or paste URL)
   - Basic Information
   - Full Description
   - Project Status (Operational, Construction, Development, Pipeline)
   - Featured toggle (shows on homepage)
4. Click **"Save Changes"**

### Deleting a Project

1. Find the project in the list
2. Click the **Delete** icon (trash)
3. Confirm deletion
4. Project will be archived (soft delete)

### Publishing a Project

Projects have three statuses:
- **Draft** - Not visible on public website
- **Published** - Visible on portfolio page and homepage (if featured)
- **Archived** - Soft deleted, not visible

To publish a project:
1. Edit the project
2. Change status to "Published" in the dropdown
3. Save changes

---

## Project Fields

### Basic Information
- **Name** - Project title
- **Slug** - URL-friendly identifier (e.g., `mojave-solar-complex`)
- **Short Description** - Brief summary (160 chars max)
- **Full Description** - Detailed project overview
- **Technology** - Solar, Wind, Storage, Hydrogen, Hybrid
- **Capacity** - Power capacity in MW
- **Location** - City, Country, Region (Americas, EMEA, APAC)
- **COD Date** - Commercial Operation Date
- **Status** - Operational, Construction, Development, Pipeline
- **Featured** - Show on homepage

### Media
- **Hero Image** - Main project image (1200x600px recommended)
- **Gallery Images** - Additional project photos
- **Alt Text** - Image description for accessibility

### Technical Specs
- **Annual Generation (MWh)** - Yearly energy production
- **CO2 Avoided (Tonnes)** - Annual carbon offset
- **Homes Powered** - Number of homes served
- **Additional Specs** - Custom key-value pairs

### Financial Highlights
- **Total Project Cost** - Investment amount
- **Debt Provider** - Financing institution
- **Equity Partners** - Investment partners
- **PPA Term** - Power Purchase Agreement duration
- **Offtaker** - Energy buyer
- **Additional Details** - Custom key-value pairs

### Timeline
- **Milestone** - Phase name
- **Date** - Completion date
- **Completed** - Yes/No status
- **Order** - Display sequence

### SEO
- **Meta Title** - Browser tab title
- **Meta Description** - Search engine description
- **OG Image** - Social media share image

---

## Where Projects Appear

### Homepage (`/`)
- **Featured Projects Section** - Shows up to 4 projects marked as "Featured"
- Automatically pulls from MongoDB
- Displays in order specified by "order" field

### Portfolio Page (`/portfolio`)
- **All Published Projects** - Shows all projects with status "Published"
- Filterable by Technology, Region, Status
- Grid and List view options

### Project Detail Page (`/portfolio/[slug]`)
- **Individual Project Page** - Full project details
- Accessed via project slug
- Shows all project information

---

## Design System (Locked)

The following design elements **cannot be changed** through the admin panel:

### Colors
- Background: `#080C14` (void)
- Cards: `#0D1421` (obsidian)
- Accent: `#F5A623` (solar)
- Secondary: `#00C2FF` (hydrogen)
- Success: `#22C55E` (growth)

### Typography
- Display: Playfair Display
- Body: DM Sans
- Mono: JetBrains Mono

### Layout
- Card styles
- Grid layouts
- Spacing system
- Responsive breakpoints

---

## Best Practices

### Content
- ✅ Keep short descriptions under 160 characters
- ✅ Use clear, professional language
- ✅ Include all key metrics for credibility
- ✅ Add high-quality images (1200x600px minimum)
- ✅ Fill in SEO fields for better search visibility

### Images
- ✅ Use landscape orientation (16:9 ratio)
- ✅ Optimize images before upload (< 500KB)
- ✅ Use descriptive alt text
- ✅ Ensure images are high resolution

### Organization
- ✅ Use consistent naming conventions
- ✅ Set proper project order for featured projects
- ✅ Keep draft projects until ready to publish
- ✅ Archive old projects instead of deleting

### SEO
- ✅ Write unique meta titles (50-60 characters)
- ✅ Write compelling meta descriptions (150-160 characters)
- ✅ Use relevant keywords naturally
- ✅ Add OG images for social sharing

---

## Workflow Example

### Adding a New Project

1. **Create Draft**
   - Click "New Project"
   - Fill basic info
   - Save as draft

2. **Add Details**
   - Edit project
   - Add full description
   - Upload images
   - Add technical specs
   - Add financial highlights
   - Create timeline

3. **Review**
   - Preview on staging
   - Check all fields
   - Verify images load
   - Test responsive design

4. **Publish**
   - Change status to "Published"
   - Mark as "Featured" if needed
   - Save changes
   - Verify on live site

---

## Troubleshooting

### Project Not Showing on Website
- ✅ Check status is "Published" (not Draft or Archived)
- ✅ Clear browser cache
- ✅ Verify slug is unique
- ✅ Check MongoDB connection

### Images Not Loading
- ✅ Verify image URL is correct
- ✅ Check Cloudinary configuration
- ✅ Ensure image is publicly accessible
- ✅ Try re-uploading image

### Featured Projects Not Updating
- ✅ Check "Featured" toggle is enabled
- ✅ Verify project is "Published"
- ✅ Check project order field
- ✅ Refresh homepage

---

## API Endpoints

For developers:

- `GET /api/admin/projects` - List all projects
- `POST /api/admin/projects` - Create new project
- `GET /api/admin/projects/[id]` - Get single project
- `PUT /api/admin/projects/[id]` - Update project
- `DELETE /api/admin/projects/[id]` - Archive project

---

## Support

For technical issues:
- Check `CMS_QUICKSTART.md` for setup
- Review `CMS_SETUP_GUIDE.md` for configuration
- Check MongoDB connection
- Verify environment variables

---

**Last Updated:** January 2025
**Version:** 1.0

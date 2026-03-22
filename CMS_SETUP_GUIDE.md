# Helio Aegis CMS - Installation & Setup Guide

## 🎯 System Overview

Production-grade Admin Panel and Content Management System for the Helio Aegis website. Manages ALL editable content while keeping design system locked in source code.

**Key Principle**: Admins edit CONTENT VALUES only. Design (colors, fonts, spacing, layout) lives in source code and cannot be changed from the admin panel.

## 📦 Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/helio-aegis?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Resend (Email)
RESEND_API_KEY=re_your-api-key
RESEND_FROM_EMAIL=admin@helioaegis.com

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Revalidation
REVALIDATE_SECRET=another-secret-key

# Initial Admin Setup
INITIAL_ADMIN_EMAIL=admin@helioaegis.com
INITIAL_ADMIN_PASSWORD=ChangeThisImmediately123!
```

### 3. Set Up MongoDB

**Option A: Local MongoDB (Recommended for Development)**

```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Verify
mongosh
```

**See `LOCAL_MONGODB_SETUP.md` for complete instructions**

**Option B: MongoDB Atlas (Cloud)**

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (M0 free tier for development, M10+ for production)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env.local`

### 4. Set Up Cloudinary

1. Create a free Cloudinary account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add credentials to `.env.local`

### 5. Set Up Upstash Redis

1. Create a free Upstash account at https://upstash.com
2. Create a new Redis database
3. Copy the REST URL and Token to `.env.local`

### 6. Set Up Resend (Optional - for email features)

1. Create account at https://resend.com
2. Get API key and add to `.env.local`

### 7. Seed the Database

```bash
npm run seed
```

This creates:
- Initial super admin user
- Homepage document with default content
- Global metrics

### 8. Run Development Server

```bash
npm run dev
```

### 9. Access Admin Panel

Navigate to: http://localhost:3000/admin/login

Login with credentials from `.env.local`:
- Email: admin@helioaegis.com
- Password: ChangeThisImmediately123!

**⚠️ IMPORTANT**: Change password immediately after first login!

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN PANEL                             │
│   /admin/* routes  ·  Protected by NextAuth                 │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  API LAYER                                   │
│   /api/admin/*  ·  Role-based middleware                    │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│               MONGODB ATLAS                                  │
│   Collections: Homepage, Project, TeamMember, Insight, etc. │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│              PUBLIC WEBSITE                                  │
│   Reads from MongoDB  ·  ISR revalidation                   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 File Structure

```
helio-aegis-website/
├── app/
│   ├── admin/                    # Admin panel routes
│   │   ├── layout.tsx           # Protected layout with auth
│   │   ├── page.tsx             # Dashboard
│   │   ├── login/page.tsx       # Login screen
│   │   ├── homepage/page.tsx    # Homepage editor
│   │   ├── projects/            # Projects CRUD
│   │   ├── team/                # Team members CRUD
│   │   ├── insights/            # Insights CRUD
│   │   ├── faq/                 # FAQ CRUD
│   │   └── ...
│   │
│   └── api/admin/               # API endpoints
│       ├── auth/[...nextauth]/  # NextAuth handler
│       ├── homepage/            # Homepage API
│       ├── projects/            # Projects API
│       └── ...
│
├── components/
│   ├── admin/                   # Admin UI components
│   │   ├── AdminLayout.tsx      # Sidebar, TopBar, Badges
│   │   └── ...
│   └── ui/                      # Reusable UI components
│
├── lib/
│   ├── mongodb.ts               # DB connection
│   ├── auth.ts                  # NextAuth config
│   ├── audit.ts                 # Audit logging
│   ├── rate-limit.ts            # Rate limiting
│   └── cloudinary.ts            # Image uploads
│
├── models/                      # Mongoose schemas
│   ├── User.ts
│   ├── Homepage.ts
│   ├── Project.ts
│   ├── AuditLog.ts
│   └── ...
│
└── scripts/
    └── seed.ts                  # Database seeding
```

## 🔐 User Roles & Permissions

### Super Admin
- Full access to all modules
- Can create/edit/delete users
- Can publish content
- Can delete content
- Access to audit logs

### Editor
- Can create and edit content in assigned modules
- May or may not have publish permission (configurable)
- Cannot manage users
- Cannot access system settings

### Viewer
- Read-only access to admin panel
- Can preview content
- Cannot edit or publish anything

## 🎨 Design Lock System

The CMS enforces a strict separation between content and design:

### ✅ Admins CAN Edit:
- Text content (headlines, body copy, labels)
- Images and media files
- Links and URLs
- Content structure (add/remove items)
- Metadata (SEO titles, descriptions)

### ❌ Admins CANNOT Edit:
- Colors
- Fonts and typography
- Spacing and layout
- Animations
- Component styling
- CSS or custom HTML

This ensures brand consistency while allowing content flexibility.

## 📊 Content Types

### Homepage
Single document containing all homepage sections:
- Hero section
- Metrics strip
- Capabilities overview
- Portfolio section
- Investment thesis
- Insights teaser
- Partners section
- Final CTA

### Projects
Individual project documents with:
- Basic info (name, location, capacity, status)
- Media (hero image, gallery)
- Technical specifications
- Financial highlights
- Timeline milestones
- Team members involved

### Team Members
Individual team member profiles:
- Personal info (name, title, bio)
- Headshot photo
- Credentials (education, experience)
- Department and role

### Insights
Articles, reports, and thought leadership:
- Content (title, body, excerpt)
- Type (article, report, video, etc.)
- Category and tags
- Cover image
- Analytics (views, downloads)

### FAQ
Frequently asked questions:
- Question and answer
- Category
- Related FAQs
- Analytics (helpful votes, views)

### Global Metrics
Site-wide metrics displayed across pages:
- Value, label, prefix, suffix
- Context note
- Display locations

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Set all variables from `.env.local` in Vercel:
- Use production MongoDB cluster (M10+)
- Use production Cloudinary account
- Generate new secure secrets
- Update NEXTAUTH_URL to production domain

## 🔧 Development Workflow

1. **Local Development**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit content through admin panel at `/admin`
   - Changes saved as drafts automatically

3. **Preview Changes**
   - Use preview buttons in admin panel
   - Opens public pages in new tab

4. **Publish**
   - Click "Publish" button in admin panel
   - Triggers ISR revalidation
   - Live site updates immediately

## 📝 Creating New Admin Users

1. Login as super admin
2. Navigate to Settings → User Management
3. Click "Invite User"
4. Fill in details:
   - Name and email
   - Role (super_admin, editor, viewer)
   - Permissions (if editor)
5. User receives email with temporary password
6. User must change password on first login

## 🔍 Audit Log

All admin actions are logged:
- User login/logout
- Content creation/updates/deletion
- Publish/unpublish actions
- Field-level change tracking

Access audit log at `/admin/audit-log`

## 🛡️ Security Features

- NextAuth.js authentication with JWT
- Bcrypt password hashing (12 rounds)
- Rate limiting on all endpoints
- Role-based access control
- Input validation with Zod
- HTML sanitization with DOMPurify
- CSRF protection
- Secure session cookies (httpOnly, secure, sameSite)

## 📈 Performance

- ISR (Incremental Static Regeneration) for public pages
- MongoDB indexes on frequently queried fields
- Cloudinary automatic image optimization
- Lazy loading for admin tables
- Pagination for large datasets

## 🐛 Troubleshooting

### Cannot connect to MongoDB
- Check MONGODB_URI in `.env.local`
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Login not working
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Images not uploading
- Verify Cloudinary credentials
- Check file size limits (10MB for images)
- Ensure proper file types (JPG, PNG, WebP)

### Rate limit errors
- Check Upstash Redis connection
- Verify UPSTASH_REDIS_REST_URL and TOKEN
- Wait for rate limit window to reset

## 📞 Support

For technical issues:
- Check documentation in `/docs` folder
- Review audit logs for error details
- Contact system administrator

---

Built with Next.js 14, MongoDB, NextAuth.js, and Cloudinary.

# 🎛️ Helio Aegis CMS - Admin Panel & Content Management System

**Production-grade headless CMS for managing all website content while keeping design locked in source code.**

---

## 🎯 Quick Links

- **[10-Minute Quick Start](./CMS_QUICKSTART.md)** - Get running immediately
- **[Complete Setup Guide](./CMS_SETUP_GUIDE.md)** - Full installation instructions
- **[Implementation Roadmap](./CMS_IMPLEMENTATION_STATUS.md)** - What's built, what's next
- **[System Architecture](./CMS_ARCHITECTURE.md)** - How everything works
- **[Delivery Summary](./CMS_DELIVERY_SUMMARY.md)** - What you received

---

## ✨ What Is This?

A complete Content Management System that allows administrators to:

✅ Edit all website content (text, images, data)  
✅ Manage projects, team members, insights, FAQs  
✅ Control what's published vs draft  
✅ Upload and organize media files  
✅ Track all changes with audit logs  
✅ Manage user accounts and permissions  

❌ **Cannot** edit design (colors, fonts, spacing, layout)  
❌ **Cannot** inject custom CSS or HTML  
❌ **Cannot** break the brand guidelines  

**Key Principle**: Content is flexible. Design is locked.

---

## 🏗️ Architecture

```
Admin Panel → API Layer → MongoDB → Public Website
    ↓           ↓           ↓            ↓
  Edit       Validate    Store        Display
 Content     & Log      Content      Content
```

**Tech Stack**:
- Next.js 14 (App Router)
- MongoDB Atlas (Database)
- NextAuth.js v5 (Authentication)
- Cloudinary (Image CDN)
- Upstash Redis (Rate Limiting)
- TipTap (Rich Text Editor)
- Radix UI (Components)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)
- Upstash Redis account (free tier works)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.local.example .env.local

# 3. Edit .env.local with your credentials
# (See CMS_SETUP_GUIDE.md for details)

# 4. Seed the database
npm run seed

# 5. Start development server
npm run dev

# 6. Login to admin panel
# http://localhost:3000/admin/login
# Email: admin@helioaegis.com
# Password: (from .env.local)
```

**Full instructions**: See [CMS_QUICKSTART.md](./CMS_QUICKSTART.md)

---

## 📁 Project Structure

```
helio-aegis-website/
├── app/
│   ├── admin/              # Admin panel routes
│   │   ├── login/          # Login page
│   │   ├── homepage/       # Homepage editor
│   │   ├── projects/       # Projects CRUD
│   │   ├── team/           # Team CRUD
│   │   ├── insights/       # Insights CRUD
│   │   ├── faq/            # FAQ CRUD
│   │   └── ...
│   │
│   └── api/admin/          # API endpoints
│       ├── auth/           # NextAuth
│       ├── homepage/       # Homepage API
│       ├── projects/       # Projects API
│       └── ...
│
├── components/
│   ├── admin/              # Admin UI components
│   └── ui/                 # Reusable components
│
├── lib/
│   ├── mongodb.ts          # DB connection
│   ├── auth.ts             # NextAuth config
│   ├── audit.ts            # Audit logging
│   └── ...
│
├── models/                 # Mongoose schemas
│   ├── User.ts
│   ├── Homepage.ts
│   ├── Project.ts
│   └── ...
│
└── scripts/
    └── seed.ts             # Database seeding
```

---

## 🗄️ Content Types

### Homepage
Single document with all homepage sections:
- Hero (headline, subheadline, CTAs)
- Metrics strip
- Capabilities overview
- Portfolio section
- Investment thesis
- Insights teaser
- Partners section
- Final CTA

### Projects
Portfolio items with:
- Basic info (name, location, capacity, status)
- Media (hero image, gallery)
- Technical specs
- Financial highlights
- Timeline
- Team members

### Team Members
Individual profiles with:
- Personal info (name, title, bio)
- Headshot photo
- Credentials (education, experience)
- Department

### Insights
Articles and reports with:
- Content (title, body, excerpt)
- Type (article, report, video, etc.)
- Category and tags
- Cover image
- Analytics

### FAQ
Questions and answers with:
- Question and answer
- Category
- Related FAQs
- Analytics (helpful votes)

### Global Metrics
Site-wide metrics:
- Value, label, prefix, suffix
- Display locations
- Icon

---

## 🔐 User Roles

### Super Admin
- Full access to everything
- Can create/edit/delete users
- Can publish content
- Can delete content
- Access to audit logs

### Editor
- Can create and edit content
- May or may not have publish permission
- Cannot manage users
- Limited to assigned modules

### Viewer
- Read-only access
- Can preview content
- Cannot edit anything

---

## 🎨 Design Lock System

### What Admins CAN Edit:
✅ Text content (headlines, body copy, labels)  
✅ Images and media files  
✅ Links and URLs  
✅ Content structure (add/remove items)  
✅ Metadata (SEO titles, descriptions)  

### What Admins CANNOT Edit:
❌ Colors  
❌ Fonts and typography  
❌ Spacing and layout  
❌ Animations  
❌ Component styling  
❌ CSS or custom HTML  

**Why?** This ensures brand consistency while allowing content flexibility.

---

## 🔒 Security Features

- ✅ NextAuth.js authentication with JWT
- ✅ Bcrypt password hashing (12 rounds)
- ✅ Rate limiting (login, API, uploads)
- ✅ Role-based access control
- ✅ Input validation with Zod
- ✅ HTML sanitization with DOMPurify
- ✅ Audit logging for all changes
- ✅ Secure session cookies (httpOnly, secure, sameSite)

---

## 📊 Current Status

### ✅ Complete (30%)
- Database models and schemas
- Authentication and security
- Admin layout and navigation
- Dashboard with statistics
- API foundation
- Documentation

### 🚧 In Progress (0%)
- Content editing pages
- Rich text editor
- Image uploader
- Data tables
- Media library

### ⏳ Not Started (70%)
- Team, Insights, FAQ modules
- Navigation editor
- User management
- Audit log viewer
- Public website integration

**See [CMS_IMPLEMENTATION_STATUS.md](./CMS_IMPLEMENTATION_STATUS.md) for detailed roadmap.**

---

## 📈 Performance Targets

- **Admin Pages**: < 2s load time
- **Public Pages**: < 2.5s LCP
- **Image Optimization**: Automatic via Cloudinary
- **Database Queries**: Indexed for performance
- **ISR**: 60-second revalidation

---

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production (Vercel)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

**See [CMS_SETUP_GUIDE.md](./CMS_SETUP_GUIDE.md) for full deployment instructions.**

---

## 💰 Cost Estimate

### Free Tier (Development)
- MongoDB Atlas M0: $0
- Cloudinary Free: $0
- Upstash Free: $0
- Vercel Hobby: $0
- **Total: $0/month**

### Production Tier
- MongoDB Atlas M10: $57/month
- Cloudinary Plus: $99/month
- Upstash Pro: $10/month
- Vercel Pro: $20/month
- **Total: $186/month**

---

## 📚 Documentation

- **[CMS_QUICKSTART.md](./CMS_QUICKSTART.md)** - 10-minute setup guide
- **[CMS_SETUP_GUIDE.md](./CMS_SETUP_GUIDE.md)** - Complete installation guide
- **[CMS_IMPLEMENTATION_STATUS.md](./CMS_IMPLEMENTATION_STATUS.md)** - Implementation roadmap
- **[CMS_ARCHITECTURE.md](./CMS_ARCHITECTURE.md)** - System architecture
- **[CMS_DELIVERY_SUMMARY.md](./CMS_DELIVERY_SUMMARY.md)** - What's included

---

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

**See [CMS_SETUP_GUIDE.md](./CMS_SETUP_GUIDE.md) for more troubleshooting.**

---

## 🎯 Next Steps

1. **Read** [CMS_QUICKSTART.md](./CMS_QUICKSTART.md) to get started
2. **Set up** MongoDB, Cloudinary, Upstash accounts
3. **Configure** `.env.local` with your credentials
4. **Run** `npm run seed` to initialize database
5. **Test** login at `/admin/login`
6. **Build** remaining features (see roadmap)

---

## 📞 Support

For technical issues:
- Check documentation files
- Review audit logs for errors
- Consult system architecture diagram

---

## 📝 License

© 2025 Helio Aegis Capital Partners LLC. All rights reserved.

---

**Built with precision for institutional capital markets.**

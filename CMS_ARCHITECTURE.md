# Helio Aegis CMS - System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ADMIN PANEL                                 │
│                    (Next.js App Router)                             │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Homepage   │  │   Projects   │  │     Team     │            │
│  │    Editor    │  │     CRUD     │  │     CRUD     │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Insights   │  │     FAQ      │  │    Media     │            │
│  │     CRUD     │  │     CRUD     │  │   Library    │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
│                    Protected by NextAuth.js                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API LAYER                                   │
│                   (/api/admin/* routes)                             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    Middleware Stack                          │  │
│  │  1. Authentication Check (NextAuth session)                 │  │
│  │  2. Role-Based Authorization (permissions)                  │  │
│  │  3. Rate Limiting (Upstash Redis)                           │  │
│  │  4. Input Validation (Zod schemas)                          │  │
│  │  5. Audit Logging (before/after mutations)                  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  REST Endpoints:                                                    │
│  • GET    /api/admin/projects      → List projects                 │
│  • POST   /api/admin/projects      → Create project                │
│  • GET    /api/admin/projects/[id] → Get single project            │
│  • PUT    /api/admin/projects/[id] → Update project                │
│  • DELETE /api/admin/projects/[id] → Delete project                │
│  • POST   /api/admin/projects/[id]/publish → Publish project       │
│                                                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Mongoose ODM
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      MONGODB ATLAS                                  │
│                   (Document Database)                               │
│                                                                     │
│  Collections:                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Homepage   │  │   Projects   │  │ TeamMembers  │            │
│  │  (1 doc)     │  │  (many docs) │  │  (many docs) │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Insights   │  │     FAQs     │  │   Metrics    │            │
│  │  (many docs) │  │  (many docs) │  │  (many docs) │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │    Users     │  │  Navigation  │  │  AuditLog    │            │
│  │  (admins)    │  │   (1 doc)    │  │  (append)    │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
│  Indexes: slug, status, updatedAt, adminEmail                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Read Operations
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      PUBLIC WEBSITE                                 │
│                   (Next.js App Router)                              │
│                                                                     │
│  Server Components fetch content from MongoDB:                     │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  app/page.tsx (Homepage)                                      │ │
│  │  • Fetches Homepage document                                  │ │
│  │  • Fetches featured Projects                                  │ │
│  │  • Fetches Metrics for 'homepage'                             │ │
│  │  • ISR: revalidate every 60 seconds                           │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  app/portfolio/page.tsx (Projects List)                       │ │
│  │  • Fetches all published Projects                             │ │
│  │  • Filters by status='published'                              │ │
│  │  • ISR: revalidate every 60 seconds                           │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  Design System (LOCKED in source code):                            │
│  • Colors, fonts, spacing defined in Tailwind config              │
│  • Component styling in TSX files                                  │
│  • NO design values stored in database                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
┌──────────────┐
│   Browser    │
└──────┬───────┘
       │ 1. Navigate to /admin
       ▼
┌──────────────────────┐
│   Middleware.ts      │
│  (Route Protection)  │
└──────┬───────────────┘
       │ 2. Check session
       ▼
┌──────────────────────┐
│   NextAuth.js        │
│  (Session Manager)   │
└──────┬───────────────┘
       │
       ├─── No Session ──────────┐
       │                         ▼
       │                  ┌──────────────┐
       │                  │ Redirect to  │
       │                  │ /admin/login │
       │                  └──────────────┘
       │
       └─── Has Session ─────────┐
                                 ▼
                          ┌──────────────┐
                          │ Load Admin   │
                          │   Layout     │
                          └──────────────┘
```

## 📝 Content Publishing Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN EDITS CONTENT                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Save as Draft│
                  │ (status:     │
                  │  'draft')    │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Preview      │
                  │ (opens public│
                  │  page in new │
                  │  tab)        │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ Click Publish│
                  │ Button       │
                  └──────┬───────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API ENDPOINT                                 │
│  POST /api/admin/projects/[id]/publish                          │
│                                                                 │
│  1. Check user has canPublish permission                        │
│  2. Update status to 'published'                                │
│  3. Set publishedAt timestamp                                   │
│  4. Write to AuditLog                                           │
│  5. Trigger ISR revalidation                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB UPDATE                               │
│  { status: 'published', publishedAt: new Date() }               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ISR REVALIDATION                             │
│  fetch('/api/revalidate?path=/portfolio&secret=xxx')            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE UPDATES                       │
│  Next rebuild of /portfolio page includes new content           │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Design Lock System

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTENT (Editable)                           │
│                                                                 │
│  Stored in MongoDB:                                             │
│  • Text strings (headlines, body copy)                          │
│  • Image URLs (Cloudinary)                                      │
│  • Links and URLs                                               │
│  • Numbers and metrics                                          │
│  • Metadata (SEO, alt text)                                     │
│                                                                 │
│  Admin can edit through CMS ✅                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN (Locked)                              │
│                                                                 │
│  Defined in source code:                                        │
│  • Colors (tailwind.config.js, globals.css)                     │
│  • Fonts (layout.tsx, tailwind.config.js)                       │
│  • Spacing (Tailwind classes in components)                     │
│  • Layout (component structure)                                 │
│  • Animations (Framer Motion in components)                     │
│                                                                 │
│  Admin CANNOT edit through CMS ❌                               │
│  Requires code changes by developer                             │
└─────────────────────────────────────────────────────────────────┘

Example:

MongoDB Document:
{
  "hero": {
    "headline": "Structuring the Clean Energy Future"  ← EDITABLE
  }
}

React Component:
<h1 className="text-7xl font-playfair text-slate-50">  ← LOCKED
  {content.hero.headline}
</h1>
```

## 🔒 Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 1: Network                                               │
│  • HTTPS only (enforced by Vercel)                              │
│  • CORS configured for same-origin                              │
│  • Security headers (CSP, X-Frame-Options, etc.)                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Layer 2: Authentication                                        │
│  • NextAuth.js JWT sessions                                     │
│  • httpOnly, secure, sameSite cookies                           │
│  • 8-hour session expiry                                        │
│  • Bcrypt password hashing (12 rounds)                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Layer 3: Authorization                                         │
│  • Role-based access control (super_admin, editor, viewer)      │
│  • Module-level permissions                                     │
│  • Action-level permissions (canPublish, canDelete, etc.)       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Layer 4: Rate Limiting                                         │
│  • Login: 5 attempts per 15 minutes                             │
│  • API: 100 requests per minute per user                        │
│  • Upload: 20 uploads per hour per user                         │
│  • Powered by Upstash Redis                                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Layer 5: Input Validation                                      │
│  • Zod schemas for all inputs                                   │
│  • Type checking at runtime                                     │
│  • DOMPurify for HTML sanitization                              │
│  • File type and size validation                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Layer 6: Audit Logging                                         │
│  • All mutations logged to AuditLog collection                  │
│  • Immutable records (no delete endpoint)                       │
│  • Includes: who, what, when, previous/new values               │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow: Creating a Project

```
1. Admin fills out form
   ↓
2. React Hook Form validates (Zod schema)
   ↓
3. POST /api/admin/projects
   ↓
4. API checks authentication (NextAuth)
   ↓
5. API checks authorization (user.permissions.editableModules includes 'projects')
   ↓
6. API validates input (Zod schema, server-side)
   ↓
7. API sanitizes HTML (DOMPurify on fullDescription)
   ↓
8. Mongoose creates document in MongoDB
   ↓
9. API writes to AuditLog (action: 'create')
   ↓
10. API returns success response
   ↓
11. Frontend shows toast notification
   ↓
12. Frontend redirects to edit page
```

## 🖼️ Image Upload Flow

```
1. Admin drags image into ImageUploader
   ↓
2. react-dropzone validates file type and size
   ↓
3. react-image-crop opens for cropping
   ↓
4. Admin crops and confirms
   ↓
5. POST /api/admin/media/upload
   ↓
6. API checks rate limit (20 uploads/hour)
   ↓
7. API uploads to Cloudinary
   ↓
8. Cloudinary optimizes image (auto format, quality)
   ↓
9. Cloudinary returns secure_url
   ↓
10. API returns URL to frontend
   ↓
11. Frontend updates form field with URL
   ↓
12. Image displayed in preview
```

---

## 🎯 Key Architectural Decisions

### 1. Headless CMS Pattern
**Why**: Separates content management from presentation layer. Allows design to be locked while content remains flexible.

### 2. MongoDB (NoSQL)
**Why**: Flexible schema perfect for CMS. Easy to add new fields without migrations. Document structure matches content hierarchy.

### 3. Next.js App Router
**Why**: Server components reduce client bundle. Built-in API routes. ISR for optimal performance.

### 4. NextAuth.js
**Why**: Industry standard. Handles sessions, CSRF, cookies. Extensible for OAuth providers.

### 5. Cloudinary
**Why**: Automatic image optimization. CDN delivery. Transformations on-the-fly. No server storage needed.

### 6. Upstash Redis
**Why**: Serverless rate limiting. No infrastructure to manage. Pay per request.

### 7. Mongoose ODM
**Why**: Schema validation. Middleware hooks. TypeScript support. Familiar API.

---

This architecture ensures:
- ✅ Security (multiple layers)
- ✅ Performance (ISR, CDN, indexes)
- ✅ Scalability (serverless, MongoDB Atlas)
- ✅ Maintainability (clear separation of concerns)
- ✅ Flexibility (easy to add new content types)
- ✅ Brand consistency (design lock system)

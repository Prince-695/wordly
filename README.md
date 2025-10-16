<div align="center">
  <h1>📝 Wordly</h1>
  <p><strong>A Modern Full-Stack Blogging Platform</strong></p>
  <p>Built with Next.js 15, tRPC, Drizzle ORM, and NextAuth.js</p>
  
  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-setup-instructions">Setup</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-documentation">Documentation</a>
  </p>

  <img src="https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/tRPC-11.0-2596BE?style=for-the-badge&logo=trpc" alt="tRPC" />
  <img src="https://img.shields.io/badge/Drizzle-0.41-C5F74F?style=for-the-badge" alt="Drizzle" />
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup Instructions](#-setup-instructions)
- [Environment Variables](#-environment-variables)
- [Database Seeding](#-database-seeding)
- [tRPC Router Structure](#-trpc-router-structure)
- [Deployment](#-deployment)
- [Design Decisions & Trade-offs](#-design-decisions--trade-offs)
- [Development Time](#-development-time)
- [Documentation](#-documentation)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 🎯 Overview

**Wordly** is a feature-rich, production-ready blogging platform that demonstrates modern web development best practices. It provides a complete solution for creating, managing, and publishing blog content with a beautiful, responsive user interface.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based auth with NextAuth.js v5
- 📝 **Rich Content Editor** - Markdown support with syntax highlighting
- 🎨 **Modern UI** - Clean, minimalistic design with dark mode support
- 🚀 **Type-Safe API** - End-to-end type safety with tRPC
- 📊 **User Dashboard** - Personal admin panel with analytics
- 🔍 **Advanced Search** - Filter posts by category, search, and status
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **Optimized Performance** - Static generation and React Server Components

---

## ✨ Features

### Priority 1: Core Features (Must-Have) ✅

- [x] **User Authentication System**
  - Sign up with email and password
  - Secure login with bcrypt password hashing
  - Session management with NextAuth.js v5
  - Protected routes and middleware
  
- [x] **Blog Post Management (CRUD)**
  - Create new posts with markdown editor
  - Edit existing posts
  - Delete posts with confirmation dialog
  - Auto-save drafts functionality
  - Publish/unpublish posts
  
- [x] **Post Listing & Display**
  - Public blog listing page with pagination
  - Individual post detail pages with slug-based routing
  - Category-based filtering
  - Search functionality across titles and content
  - Reading time calculation
  - Responsive card layouts

### Priority 2: Enhanced Features ✅

- [x] **Categories System**
  - Many-to-many relationship between posts and categories
  - Category-based filtering on blog page
  - Category badges on post cards
  - Category management in admin
  
- [x] **Rich Text Editing**
  - Markdown support with `react-markdown`
  - Syntax highlighting for code blocks (highlight.js)
  - GitHub Flavored Markdown (GFM)
  - Live preview support
  
- [x] **User Dashboard**
  - Personal admin panel showing user's posts only
  - Statistics cards (total posts, published, drafts)
  - Quick actions (create post, view all posts)
  - User-scoped operations (users only see/edit their own posts)
  
- [x] **Search & Filtering**
  - Real-time search across post titles and content
  - Filter by category
  - Filter by published/draft status
  - Sort by latest/oldest

### Priority 3: Polish & UX ✅

- [x] **Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimizations
  - Responsive navigation with mobile menu
  - Touch-friendly UI elements
  
- [x] **Landing Page**
  - Hero section with gradient effects
  - Features showcase
  - Statistics section with live database data
  - Testimonials section
  - Call-to-action section
  - Professional footer
  
- [x] **UI/UX Enhancements**
  - Dark mode support with `next-themes`
  - Loading states and skeletons
  - Toast notifications with `sonner`
  - Smooth animations and transitions
  - Confirmation dialogs for destructive actions
  - Error handling with user-friendly messages
  
- [x] **Performance Optimizations**
  - Static page generation where possible
  - React Server Components for better performance
  - Optimized images and assets
  - Efficient database queries with indexes
  - Pagination for large datasets

### Bonus Features ✅

- [x] **Database Seeding**
  - Comprehensive seed script with 20+ sample posts
  - 5 predefined categories
  - Default admin user for testing
  - Realistic content with proper markdown
  
- [x] **Type Safety**
  - End-to-end type safety with TypeScript
  - tRPC for API type inference
  - Zod schemas for input validation
  - Type-safe environment variables
  
- [x] **Developer Experience**
  - ESLint and Prettier configuration
  - Type checking scripts
  - Database studio with Drizzle Kit
  - Comprehensive npm scripts
  - Hot module replacement with Turbopack

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 15.2](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript 5.8](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Re-usable component library
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful icon set
- **Markdown:** [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- **Syntax Highlighting:** [highlight.js](https://highlightjs.org/) - Code syntax highlighting
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

### Backend
- **API Layer:** [tRPC 11.0](https://trpc.io/) - End-to-end type-safe APIs
- **Database:** [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM:** [Drizzle ORM 0.41](https://orm.drizzle.team/) - TypeScript ORM
- **Authentication:** [NextAuth.js 5.0 Beta](https://next-auth.js.org/) - Authentication framework
- **Password Hashing:** [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Secure password hashing
- **Validation:** [Zod 3.24](https://zod.dev/) - TypeScript-first schema validation

### State Management & Data Fetching
- **React Query:** [TanStack Query 5.69](https://tanstack.com/query) - Data fetching & caching
- **Server State:** tRPC + React Query integration

### DevOps & Tooling
- **Package Manager:** [pnpm 10.5](https://pnpm.io/) - Fast, disk space efficient
- **Linting:** [ESLint 9.23](https://eslint.org/) - Code quality
- **Formatting:** [Prettier 3.5](https://prettier.io/) - Code formatting
- **Database Tools:** [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) - Migrations & Studio
- **Deployment:** [Vercel](https://vercel.com/) - Zero-config deployment

---

## 📁 Project Structure

```
wordly/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Landing page
│   │   ├── blog/               # Public blog listing
│   │   ├── blog/[slug]/        # Individual post pages
│   │   ├── admin/              # Protected admin dashboard
│   │   │   ├── page.tsx        # Dashboard with stats
│   │   │   └── posts/
│   │   │       ├── new/        # Create/edit post form
│   │   │       └── page.tsx    # Redirect to dashboard
│   │   ├── auth/               # Authentication pages
│   │   │   ├── signin/         # Sign in page
│   │   │   └── signup/         # Sign up page
│   │   └── api/
│   │       └── trpc/[trpc]/    # tRPC API route handler
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── navbar.tsx          # Navigation bar
│   │   ├── footer.tsx          # Footer component
│   │   ├── hero.tsx            # Landing page hero
│   │   ├── features.tsx        # Features section
│   │   ├── statistics.tsx      # Stats section
│   │   ├── testimonials.tsx    # Testimonials section
│   │   ├── cta.tsx             # Call-to-action section
│   │   ├── blog-card.tsx       # Post card component
│   │   └── markdown-renderer.tsx # Markdown renderer
│   ├── server/
│   │   ├── api/
│   │   │   ├── root.ts         # Main tRPC router
│   │   │   ├── trpc.ts         # tRPC setup & procedures
│   │   │   └── routers/
│   │   │       ├── post.ts     # Post CRUD operations
│   │   │       ├── category.ts # Category operations
│   │   │       └── user.ts     # User operations
│   │   ├── auth.ts             # NextAuth configuration
│   │   ├── db/
│   │   │   ├── index.ts        # Database client
│   │   │   └── schema.ts       # Drizzle schema definitions
│   │   └── session.ts          # Session utilities
│   ├── scripts/
│   │   └── seed.ts             # Database seed script
│   ├── trpc/
│   │   ├── react.tsx           # tRPC React client
│   │   ├── server.ts           # tRPC server caller
│   │   └── query-client.ts     # React Query config
│   ├── styles/
│   │   └── globals.css         # Global styles
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── env.js                  # Environment variable validation
├── drizzle.config.ts           # Drizzle ORM configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Example environment variables
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **pnpm** 8.x or higher ([Install](https://pnpm.io/installation))
- **PostgreSQL** database (local or cloud provider like [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/))
- **Git** for version control

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/Prince-695/wordly.git
cd wordly
```

#### 2. Install Dependencies

```bash
pnpm install
```

#### 3. Set Up Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Then edit `.env` with your values (see [Environment Variables](#-environment-variables) section below).

#### 4. Set Up the Database

**Generate migration files from schema:**
```bash
pnpm db:generate
```

**Apply migrations to your database:**
```bash
pnpm db:migrate
```

**Seed the database with sample data (optional but recommended):**
```bash
pnpm db:seed
```

This will create:
- 5 categories (Technology, Design, Business, Lifestyle, Tutorial)
- 20+ sample blog posts with realistic content
- 1 admin user (email: `admin@example.com`, password: `admin123`)

#### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 6. Test Authentication

After seeding, you can sign in with:
- **Email:** `admin@example.com`
- **Password:** `admin123`

---

## 🔐 Environment Variables

Wordly uses type-safe environment variables validated by `@t3-oss/env-nextjs` with Zod schemas.

### Required Variables

Create a `.env` file with the following variables:

```bash
# Database Connection (PostgreSQL)
# Format: postgresql://username:password@host:port/database
DATABASE_URL="postgresql://user:password@localhost:5432/wordly"

# NextAuth Secret (for JWT signing and encryption)
# Generate with: openssl rand -base64 32
AUTH_SECRET="your-super-secret-key-minimum-32-characters-long"

# Public Application URL
# Development: http://localhost:3000
# Production: https://your-domain.com
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### How to Get Database URL

**Option 1: Neon (Recommended - Free)**
1. Sign up at [neon.tech](https://neon.tech/)
2. Create a new project
3. Copy the connection string from the dashboard
4. Use the pooled connection string for better performance

**Option 2: Supabase (Free)**
1. Create project at [supabase.com](https://supabase.com/)
2. Go to Settings → Database
3. Copy the connection string (use Pooling mode)

**Option 3: Local PostgreSQL**
1. Install PostgreSQL locally
2. Create a database: `createdb wordly`
3. Use: `postgresql://postgres:password@localhost:5432/wordly`

### How to Generate AUTH_SECRET

**Using OpenSSL (recommended):**
```bash
openssl rand -base64 32
```

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Online Generator:**
Visit [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

### Environment Variable Validation

The app validates environment variables at build time. If any are missing or invalid, the build will fail with a descriptive error message.

**Skip validation (not recommended):**
```bash
SKIP_ENV_VALIDATION=true pnpm build
```

---

## 🌱 Database Seeding

### What is Seeding?

Seeding populates your database with sample data for development and testing. Wordly includes a comprehensive seed script that creates realistic blog content.

### What Gets Seeded

- **5 Categories:**
  - Technology - Latest trends in tech and programming
  - Design - UI/UX and creative processes
  - Business - Entrepreneurship and strategies
  - Lifestyle - Personal growth and wellness
  - Tutorial - Step-by-step guides

- **20+ Blog Posts:**
  - Mix of published and draft posts
  - Full markdown content with code examples
  - Realistic reading times (calculated automatically)
  - SEO-friendly slugs
  - Post-category relationships

- **1 Admin User:**
  - Email: `admin@example.com`
  - Password: `admin123` (bcrypt hashed)

### How to Seed

#### Prerequisites

1. Database must be running and accessible
2. Migrations must be applied first

#### Seed Command

```bash
pnpm db:seed
```

#### Expected Output

```
🌱 Seeding database...
✅ Deleted existing data
✅ Created 5 categories
✅ Created admin user (admin@example.com)
✅ Created 20 posts
✅ Created post-category relationships
🎉 Database seeded successfully!
```

#### Verify Seeded Data

**Method 1: Drizzle Studio (Visual)**
```bash
pnpm db:studio
```
Opens a GUI at `https://local.drizzle.studio` to browse your database.

**Method 2: Your Application**
```bash
pnpm dev
```
- Visit `/blog` to see all posts
- Sign in and visit `/admin` to manage posts

**Method 3: Database Query**
```bash
psql $DATABASE_URL

SELECT COUNT(*) FROM posts;       -- Should be 20+
SELECT COUNT(*) FROM categories;  -- Should be 5
SELECT COUNT(*) FROM users;       -- Should be 1
```

### Important Warnings ⚠️

**The seed script DELETES all existing data before seeding!**

```typescript
// Clears these tables:
await db.delete(postCategories);
await db.delete(posts);
await db.delete(categories);
await db.delete(users);
```

**Best Practices:**
- ✅ Only run in **development**
- ❌ Never run on **production** database
- ✅ Backup data before seeding
- ✅ Use separate databases for dev/prod

### Customizing Seed Data

Edit `src/scripts/seed.ts` to add your own posts and categories:

```typescript
const samplePosts = [
  // ... existing posts
  {
    title: "Your Custom Post",
    slug: "your-custom-post",
    excerpt: "Your excerpt here...",
    content: `# Your Post\n\nYour markdown content...`,
    published: true,
    categoryIds: [1], // Technology
  },
];
```

---

## 🔌 tRPC Router Structure

### What is tRPC?

**tRPC** (TypeScript Remote Procedure Call) enables end-to-end type-safe APIs without code generation. Changes to your backend types are instantly reflected in your frontend.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    CONTEXT                              │
│  - Database (Drizzle ORM)                              │
│  - User Session (NextAuth)                             │
│  - Request Headers                                      │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                  PROCEDURES                             │
│  publicProcedure - Anyone can call                     │
│  protectedProcedure - Requires authentication          │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                   ROUTERS                               │
│  postRouter - Post CRUD operations                     │
│  categoryRouter - Category management                  │
│  userRouter - User profile & stats                     │
└─────────────────────────────────────────────────────────┘
```

### File Structure

```
src/server/api/
├── trpc.ts              # Core setup (context, procedures, middleware)
├── root.ts              # Main router combining all sub-routers
└── routers/
    ├── post.ts          # Post endpoints
    ├── category.ts      # Category endpoints
    └── user.ts          # User endpoints
```

### Post Router Endpoints

**Public Endpoints** (no authentication required):

- `post.getAll` - List posts with filtering, search, and pagination
- `post.getBySlug` - Get single post by slug
- `post.getFeatured` - Get featured posts
- `post.getRelated` - Get related posts

**Protected Endpoints** (authentication required):

- `post.getMyPosts` - Get logged-in user's posts
- `post.getMyStats` - Get user's post statistics
- `post.create` - Create new post
- `post.update` - Update existing post (ownership verified)
- `post.delete` - Delete post (ownership verified)
- `post.togglePublish` - Publish/unpublish post

### Example: Creating a Post

**Backend (tRPC endpoint):**
```typescript
// src/server/api/routers/post.ts
create: protectedProcedure
  .input(z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    categoryIds: z.array(z.number()).min(1),
    published: z.boolean().default(false),
  }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id; // Guaranteed to exist
    
    // Generate slug, reading time, excerpt
    const slug = generateSlug(input.title);
    const readingTime = calculateReadingTime(input.content);
    const excerpt = generateExcerpt(input.content);

    // Insert post
    const [post] = await ctx.db.insert(posts).values({
      ...input,
      slug,
      readingTime,
      excerpt,
      userId,
    }).returning();

    // Create category relationships
    await ctx.db.insert(postCategories).values(
      input.categoryIds.map(catId => ({
        postId: post.id,
        categoryId: catId,
      }))
    );

    return post;
  })
```

**Frontend Usage:**
```typescript
// app/admin/posts/new/page.tsx
'use client';
import { api } from "~/trpc/react";

const createPost = api.post.create.useMutation({
  onSuccess: () => {
    router.push('/admin');
    toast.success('Post created!');
  },
});

createPost.mutate({
  title: "My Post",
  content: "# Hello World",
  categoryIds: [1, 3],
  published: false,
});
```

### Type Safety Benefits

✅ **Auto-completion** - IDE knows all endpoints and parameters
✅ **Type checking** - Errors caught at compile time
✅ **Input validation** - Zod schemas validate all inputs
✅ **No API docs needed** - Types are self-documenting

### Security Features

- **Protected procedures** - Automatically reject unauthenticated requests
- **Ownership verification** - Users can only edit/delete their own posts
- **Input validation** - All inputs validated with Zod schemas
- **SQL injection protection** - Drizzle ORM parameterizes queries

For detailed tRPC documentation, see [TRPC_AND_SEEDING_GUIDE.md](./TRPC_AND_SEEDING_GUIDE.md)

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Vercel offers zero-config deployment for Next.js applications with a generous free tier.

#### Step 1: Prepare Your Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `wordly` repository
4. Click **"Import"**

#### Step 3: Configure Environment Variables

In the Vercel dashboard, add these environment variables:

```bash
DATABASE_URL=postgresql://your-production-db-url
AUTH_SECRET=your-new-production-secret-dont-reuse-dev-secret
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Important:**
- Generate a **new** `AUTH_SECRET` for production
- Use a production database (not your local dev database)
- Update `NEXT_PUBLIC_APP_URL` to your Vercel URL

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2 minutes)
3. Your app is live! 🎉

#### Step 5: Run Migrations & Seed (Production)

After deployment, connect to your production database and run:

```bash
# Set DATABASE_URL to production
export DATABASE_URL="your-production-db-url"

# Run migrations
pnpm db:migrate

# Seed (optional - only if you want sample data)
pnpm db:seed
```

### Alternative: Deploy to Railway

1. Visit [railway.app](https://railway.app/)
2. Create new project from GitHub repo
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

### Production Checklist

Before going live, ensure:

- [ ] Environment variables are set correctly
- [ ] Database migrations have been run
- [ ] Production database is backed up regularly
- [ ] `AUTH_SECRET` is different from development
- [ ] Error monitoring is set up (optional: Sentry)
- [ ] Analytics are configured (optional: Vercel Analytics)
- [ ] Domain is configured (optional)

---

## 🎨 Design Decisions & Trade-offs

### Architecture Decisions

#### 1. Next.js App Router over Pages Router

**Decision:** Use Next.js 15 with App Router

**Rationale:**
- Modern React patterns (Server Components, Streaming)
- Better performance with selective hydration
- Improved developer experience
- Future-proof architecture

**Trade-off:** Steeper learning curve, but better long-term benefits

#### 2. tRPC over REST API

**Decision:** Use tRPC for API layer

**Rationale:**
- End-to-end type safety without code generation
- Eliminates API documentation needs
- Better developer experience with auto-completion
- Seamless integration with React Query

**Trade-off:** Less suitable for public APIs (not HTTP-standard), but perfect for internal full-stack apps

#### 3. Drizzle ORM over Prisma

**Decision:** Use Drizzle ORM for database operations

**Rationale:**
- Lighter weight and faster
- SQL-like syntax (easier to learn)
- Better TypeScript integration
- No separate schema language

**Trade-off:** Smaller community than Prisma, fewer resources

#### 4. Credentials Auth over OAuth

**Decision:** Use email/password authentication (NextAuth Credentials provider)

**Rationale:**
- Simpler setup for demo purposes
- No third-party API dependencies
- Full control over user data

**Trade-off:** Less convenient for users (no "Sign in with Google"), but sufficient for MVP

### UI/UX Decisions

#### 5. Server Components First

**Decision:** Use Server Components by default, Client Components only when needed

**Rationale:**
- Better performance (less JavaScript sent to browser)
- SEO-friendly rendering
- Faster initial page loads

**Trade-off:** More complex state management, but worth it for performance

#### 6. Minimalistic Design

**Decision:** Clean, minimal UI inspired by modern SaaS applications

**Rationale:**
- Professional appearance
- Better focus on content
- Faster load times (less CSS)
- Timeless aesthetic

**Trade-off:** Less "flashy" than heavily animated sites, but more professional

#### 7. Dark Mode Support

**Decision:** Include dark/light theme toggle

**Rationale:**
- Better user experience
- Reduces eye strain
- Modern expectation
- Easy to implement with `next-themes`

**Trade-off:** Additional testing needed for both themes

### Database Decisions

#### 8. PostgreSQL over MongoDB

**Decision:** Use PostgreSQL relational database

**Rationale:**
- ACID compliance for data integrity
- Better for structured blog data
- Powerful querying capabilities
- Industry standard

**Trade-off:** Less flexible schema than MongoDB, but better data consistency

#### 9. Soft Deletes vs Hard Deletes

**Decision:** Use hard deletes (permanent deletion)

**Rationale:**
- Simpler implementation
- Less database bloat
- Sufficient for MVP

**Trade-off:** No "undo" for deletions (could add soft deletes later if needed)

### Performance Decisions

#### 10. Static Generation Where Possible

**Decision:** Use static generation for blog posts, dynamic for admin

**Rationale:**
- Faster page loads
- Better SEO
- Reduced server load

**Trade-off:** Need to rebuild for content updates (acceptable for blogs)

---

## ⏱️ Development Time

### Total Time Spent: ~40-50 hours

**Breakdown by Phase:**

| Phase | Time | Details |
|-------|------|---------|
| **Planning & Setup** | 4 hours | Project structure, tech stack selection, database design |
| **Authentication System** | 6 hours | NextAuth.js setup, sign in/up pages, middleware, session management |
| **Database Schema & ORM** | 5 hours | Drizzle schema design, migrations, relationships, indexes |
| **tRPC API Layer** | 8 hours | Router setup, all CRUD endpoints, validation, type safety |
| **UI Components** | 10 hours | shadcn/ui setup, custom components, navbar, footer, forms |
| **Blog Features** | 7 hours | Post listing, search, filters, markdown rendering, syntax highlighting |
| **Admin Dashboard** | 6 hours | Dashboard UI, statistics, user-scoped data, CRUD operations |
| **Landing Page** | 5 hours | Hero, features, stats, testimonials, CTA sections |
| **Database Seeding** | 2 hours | Seed script with 20+ realistic posts and categories |
| **Testing & Debugging** | 4 hours | Bug fixes, responsive design, cross-browser testing |
| **Documentation** | 3 hours | README, setup guide, tRPC documentation |

**Key Learnings:**
- Next.js 15 App Router patterns and best practices
- tRPC integration with React Query
- Drizzle ORM advanced features (joins, relations)
- NextAuth.js v5 beta implementation
- Type-safe environment variables with Zod

---

## 📚 Documentation

### Additional Guides

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Comprehensive setup instructions with detailed environment variable explanations
- **[TRPC_AND_SEEDING_GUIDE.md](./TRPC_AND_SEEDING_GUIDE.md)** - 60+ page technical guide on tRPC architecture and database seeding
- **[TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)** - Testing checklist for authentication and CRUD operations

### Available Scripts

```bash
# Development
pnpm dev                # Start dev server with Turbopack
pnpm build              # Build for production
pnpm start              # Start production server
pnpm preview            # Build + start (test production locally)

# Database
pnpm db:generate        # Generate migrations from schema
pnpm db:migrate         # Apply migrations to database
pnpm db:push            # Push schema changes (bypass migrations)
pnpm db:studio          # Open Drizzle Studio GUI
pnpm db:seed            # Seed database with sample data

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Auto-fix ESLint errors
pnpm typecheck          # Check TypeScript types
pnpm format:check       # Check Prettier formatting
pnpm format:write       # Auto-format with Prettier
pnpm check              # Run lint + typecheck together
```

---

## 📸 Screenshots

### Landing Page
Beautiful, modern landing page with hero section, features, statistics, and testimonials.

### Blog Listing
Clean blog listing with search, category filters, and responsive card layout.

### Post Detail Page
Individual post pages with markdown rendering and syntax-highlighted code blocks.

### Admin Dashboard
Personal admin panel showing user statistics and post management interface.

### Create/Edit Post
Rich markdown editor with live preview and category selection.

### Authentication
Secure sign in and sign up pages with form validation.

*(Add actual screenshots after deployment)*

---

## 🤝 Contributing

While this is a personal project, suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [T3 Stack](https://create.t3.gg/) - For the amazing starter template
- [shadcn/ui](https://ui.shadcn.com/) - For beautiful, accessible UI components
- [Vercel](https://vercel.com/) - For seamless deployment platform
- [Neon](https://neon.tech/) - For serverless PostgreSQL database

---

## 📧 Contact

**Prince Rathod**

- GitHub: [@Prince-695](https://github.com/Prince-695)
- LinkedIn: [Prince Rathod](https://www.linkedin.com/in/prince-rathod-3a9b1b2b8/)
- Email: rathodprince411@gmail.com

---

<div align="center">
  <p>Built by Prince Rathod using Next.js, tRPC, and TypeScript</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>

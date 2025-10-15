/**
 * Database Seed Script
 * Populates the database with sample data for development and testing
 */

import "dotenv/config";
import { db } from "../server/db";
import { categories, posts, postCategories, users } from "../server/db/schema";
import bcrypt from "bcryptjs";

const sampleCategories = [
  {
    name: "Technology",
    slug: "technology",
    description: "Latest trends in tech, programming, and innovation",
  },
  {
    name: "Design",
    slug: "design",
    description: "UI/UX design, visual arts, and creative processes",
  },
  {
    name: "Business",
    slug: "business",
    description: "Entrepreneurship, startups, and business strategies",
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Personal growth, wellness, and daily life tips",
  },
  {
    name: "Tutorial",
    slug: "tutorial",
    description: "Step-by-step guides and educational content",
  },
];

const samplePosts = [
  {
    title: "Getting Started with Next.js 15 App Router",
    slug: "getting-started-nextjs-15",
    excerpt: "Learn how to build modern web applications with Next.js 15 and the powerful App Router.",
    content: `# Getting Started with Next.js 15 App Router

Next.js 15 introduces several improvements to the App Router, making it the best choice for building React applications in 2025.

## What's New in Next.js 15?

The latest version brings:

- **Improved Performance**: Faster builds and optimized runtime
- **Enhanced Developer Experience**: Better error messages and debugging tools
- **Server Components**: React Server Components by default
- **Streaming SSR**: Incremental rendering for better UX

## Setting Up Your First Project

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Concepts

1. **App Router**: File-system based routing in the \`app\` directory
2. **Server Components**: Components that render on the server by default
3. **Client Components**: Interactive components using \`'use client'\`
4. **Layouts**: Shared UI across multiple pages

Stay tuned for more tutorials on mastering Next.js 15!`,
    published: true,
    categoryIds: [1, 5], // Technology, Tutorial
  },
  {
    title: "The Art of Minimalist Design",
    slug: "art-of-minimalist-design",
    excerpt: "Discover how less can be more in modern web and product design.",
    content: `# The Art of Minimalist Design

Minimalism in design is not about removing features—it's about focusing on what truly matters.

## Core Principles

### 1. White Space is Your Friend
Don't fear empty space. It helps guide the user's eye and creates breathing room.

### 2. Typography Matters
Choose 2-3 fonts maximum and use them consistently throughout your design.

### 3. Color Palette
Limit your colors to 3-5 complementary shades. More colors = more confusion.

## Real-World Examples

- Apple's product pages
- Stripe's dashboard
- Linear's project management interface

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

## Conclusion

Minimalist design creates clarity and improves user experience when done right.`,
    published: true,
    categoryIds: [2], // Design
  },
  {
    title: "Building a Successful Startup in 2025",
    slug: "building-successful-startup-2025",
    excerpt: "Essential strategies and lessons learned from modern startup founders.",
    content: `# Building a Successful Startup in 2025

The startup landscape has evolved dramatically. Here's what you need to know.

## Key Success Factors

### 1. Solve a Real Problem
Don't build a solution looking for a problem. Start with customer pain points.

### 2. Build in Public
Share your journey on social media. Transparency builds trust and attracts early users.

### 3. MVP First
Launch quickly with a minimum viable product. Iterate based on real feedback.

## Common Pitfalls to Avoid

- Over-engineering from day one
- Ignoring customer feedback
- Trying to do everything yourself
- Focusing on fundraising over product

## Tools We Recommend

- \`Vercel\` for deployment
- \`Supabase\` for backend
- \`Stripe\` for payments
- \`PostHog\` for analytics

Remember: execution matters more than ideas.`,
    published: true,
    categoryIds: [3], // Business
  },
  {
    title: "10 Productivity Hacks for Remote Workers",
    slug: "productivity-hacks-remote-workers",
    excerpt: "Maximize your efficiency while working from home with these proven techniques.",
    content: `# 10 Productivity Hacks for Remote Workers

Working remotely requires discipline and the right strategies.

## Top 10 Tips

1. **Create a Dedicated Workspace** - Separate work from life
2. **Follow a Routine** - Start and end at consistent times
3. **Use Time Blocking** - Schedule deep work sessions
4. **Take Regular Breaks** - Pomodoro technique works wonders
5. **Eliminate Distractions** - Turn off notifications during focus time
6. **Exercise Daily** - Physical health impacts mental performance
7. **Set Clear Boundaries** - Communicate your working hours
8. **Use the Right Tools** - Invest in good equipment
9. **Stay Connected** - Regular video calls with teammates
10. **Track Your Progress** - Daily journaling or task logs

## Tools That Help

- **Notion** for note-taking
- **Todoist** for task management
- **RescueTime** for tracking
- **Loom** for async communication

Start implementing these today and watch your productivity soar!`,
    published: true,
    categoryIds: [4], // Lifestyle
  },
  {
    title: "Understanding TypeScript Advanced Types",
    slug: "typescript-advanced-types",
    excerpt: "Master utility types, conditional types, and mapped types in TypeScript.",
    content: `# Understanding TypeScript Advanced Types

TypeScript's type system is incredibly powerful. Let's explore advanced concepts.

## Utility Types

TypeScript provides built-in utility types:

\`\`\`typescript
// Partial - make all properties optional
type User = { name: string; age: number; };
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserName = Pick<User, 'name'>;

// Omit - exclude properties
type UserWithoutAge = Omit<User, 'age'>;

// Record - create object type
type Roles = Record<string, boolean>;
\`\`\`

## Conditional Types

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
type Result = IsString<"hello">; // true
\`\`\`

## Mapped Types

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

Master these and you'll write safer, more maintainable code!`,
    published: true,
    categoryIds: [1, 5], // Technology, Tutorial
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Each",
    slug: "css-grid-vs-flexbox",
    excerpt: "A comprehensive guide to choosing the right layout system for your projects.",
    content: `# CSS Grid vs Flexbox: When to Use Each

Both are powerful, but they solve different problems.

## Flexbox - One Dimensional

Use Flexbox when you need to align items in a single direction (row OR column).

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

**Best for:**
- Navigation bars
- Card layouts in a row
- Centering items
- Evenly spacing elements

## Grid - Two Dimensional

Use Grid when you need complex layouts in both rows AND columns.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
\`\`\`

**Best for:**
- Page layouts
- Photo galleries
- Dashboard layouts
- Magazine-style designs

## Can You Use Both?

Absolutely! Grid for overall page structure, Flexbox for component-level alignment.

Choose based on your specific layout needs!`,
    published: true,
    categoryIds: [1, 2, 5], // Technology, Design, Tutorial
  },
  {
    title: "The Future of AI in Web Development",
    slug: "future-ai-web-development",
    excerpt: "How artificial intelligence is transforming the way we build websites.",
    content: `# The Future of AI in Web Development

AI is not replacing developers—it's making us more productive.

## Current AI Tools

### GitHub Copilot
Your AI pair programmer. Suggests code as you type.

### ChatGPT
Great for debugging, explaining code, and generating boilerplate.

### v0.dev
Generate UI components from text descriptions.

## What's Coming Next

1. **AI-Powered Testing** - Automated test generation
2. **Smart Code Reviews** - AI spotting bugs and security issues
3. **Design to Code** - Convert Figma designs directly to React
4. **Performance Optimization** - AI analyzing and fixing bottlenecks

## How to Prepare

- Learn prompt engineering
- Understand AI limitations
- Focus on problem-solving over syntax
- Build projects AI can't (yet)

The future is collaborative: humans + AI building amazing products together.`,
    published: true,
    categoryIds: [1, 3], // Technology, Business
  },
  {
    title: "Creating Engaging User Interfaces",
    slug: "creating-engaging-user-interfaces",
    excerpt: "Design principles and techniques for interfaces that users love.",
    content: `# Creating Engaging User Interfaces

Great UI design is invisible. Bad UI design is frustrating.

## Fundamental Principles

### 1. Consistency
Use the same patterns throughout your application.

### 2. Feedback
Every action should have a visible reaction.

### 3. Simplicity
Remove unnecessary elements. Every component should serve a purpose.

### 4. Accessibility
Design for everyone, including users with disabilities.

## Visual Hierarchy

Guide users through your interface with:
- **Size**: Larger = more important
- **Color**: Highlight key actions
- **Spacing**: Group related elements
- **Typography**: Vary weights and sizes

## Micro-interactions

Small animations that delight users:
- Button hover effects
- Loading spinners
- Success checkmarks
- Error shake animations

## Tools & Resources

- Figma for design
- Framer for prototyping
- Coolors for color palettes
- FontPair for typography

Remember: Good UI design serves the user, not the designer's ego.`,
    published: true,
    categoryIds: [2], // Design
  },
  {
    title: "Mastering Git and GitHub Workflows",
    slug: "mastering-git-github-workflows",
    excerpt: "Essential Git commands and GitHub best practices for developers.",
    content: `# Mastering Git and GitHub Workflows

Git is essential for modern development. Here's everything you need to know.

## Essential Commands

\`\`\`bash
# Initialize a repo
git init

# Clone a repository
git clone <url>

# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Your message"

# Push to remote
git push origin main
\`\`\`

## Branching Strategy

\`\`\`bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Merge back to main
git checkout main
git merge feature/new-feature
\`\`\`

## Best Practices

1. **Commit Often** - Small, focused commits
2. **Write Clear Messages** - Describe what and why
3. **Pull Before Push** - Avoid conflicts
4. **Use Branches** - Never commit directly to main
5. **Review Your Changes** - Use \`git diff\` before committing

## GitHub Flow

1. Create a branch
2. Make changes
3. Open a Pull Request
4. Discuss and review
5. Merge to main

Master these workflows and collaborate like a pro!`,
    published: true,
    categoryIds: [1, 5], // Technology, Tutorial
  },
  {
    title: "Healthy Habits for Software Developers",
    slug: "healthy-habits-software-developers",
    excerpt: "Take care of your body and mind while building great software.",
    content: `# Healthy Habits for Software Developers

Sitting at a desk all day takes a toll. Here's how to stay healthy.

## Physical Health

### Ergonomics Matter
- Adjust monitor to eye level
- Keep keyboard and mouse close
- Use a good chair with lumbar support
- Consider a standing desk

### Exercise Regularly
- 20-30 minutes of cardio daily
- Strength training 2-3x per week
- Stretch every hour
- Walk during lunch breaks

## Mental Health

### Avoid Burnout
- Take actual breaks
- Work reasonable hours
- Learn to say no
- Disconnect after work

### Manage Stress
- Practice meditation
- Try the Pomodoro technique
- Keep a journal
- Talk to someone when overwhelmed

## Nutrition Tips

- Stay hydrated (8 glasses of water daily)
- Healthy snacks at your desk
- Avoid excessive caffeine
- Don't skip meals

## Eye Care

Follow the 20-20-20 rule:
Every 20 minutes, look at something 20 feet away for 20 seconds.

Your code will be better when you feel better!`,
    published: true,
    categoryIds: [4], // Lifestyle
  },
  {
    title: "Building REST APIs with Node.js and Express",
    slug: "building-rest-apis-nodejs-express",
    excerpt: "A complete guide to creating robust and scalable REST APIs.",
    content: `# Building REST APIs with Node.js and Express

Learn to build professional-grade APIs from scratch.

## Setting Up

\`\`\`bash
npm init -y
npm install express cors dotenv
npm install -D typescript @types/node @types/express
\`\`\`

## Basic Server

\`\`\`typescript
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## RESTful Routes

- \`GET /api/users\` - List all users
- \`GET /api/users/:id\` - Get single user
- \`POST /api/users\` - Create user
- \`PUT /api/users/:id\` - Update user
- \`DELETE /api/users/:id\` - Delete user

## Best Practices

1. Use proper HTTP status codes
2. Validate input data
3. Handle errors gracefully
4. Implement rate limiting
5. Use environment variables
6. Add request logging
7. Implement authentication
8. Version your API

## Error Handling

\`\`\`typescript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
\`\`\`

Build APIs that are reliable, scalable, and developer-friendly!`,
    published: true,
    categoryIds: [1, 5], // Technology, Tutorial
  },
  {
    title: "The Psychology of Color in Design",
    slug: "psychology-color-design",
    excerpt: "How colors influence user behavior and emotions in digital products.",
    content: `# The Psychology of Color in Design

Colors aren't just aesthetic—they communicate and influence behavior.

## Color Meanings

### Blue
- Trust, reliability, professionalism
- Used by: Facebook, Twitter, LinkedIn
- Best for: Finance, healthcare, tech

### Red
- Energy, urgency, passion
- Increases heart rate
- Best for: Food, sales, entertainment

### Green
- Growth, health, nature
- Calming and balanced
- Best for: Environment, wellness, finance

### Yellow
- Optimism, warmth, caution
- Grabs attention
- Best for: Children, food, warnings

### Purple
- Luxury, creativity, wisdom
- Used by premium brands
- Best for: Beauty, luxury goods

## Application Tips

1. **Primary Color**: Brand identity
2. **Secondary Colors**: Supporting elements
3. **Accent Color**: CTAs and highlights
4. **Neutral Colors**: Backgrounds and text

## Color Accessibility

- Ensure sufficient contrast ratios
- Don't rely solely on color
- Test with color blindness simulators
- Follow WCAG guidelines

Choose colors that align with your brand message and audience!`,
    published: true,
    categoryIds: [2], // Design
  },
  {
    title: "Scaling Your SaaS Business",
    slug: "scaling-saas-business",
    excerpt: "Strategies for growing your SaaS from 0 to 1000 customers.",
    content: `# Scaling Your SaaS Business

Growing a SaaS requires different strategies at different stages.

## 0-10 Customers: Validation Phase

- Talk to every customer personally
- Iterate quickly based on feedback
- Focus on product-market fit
- Manual onboarding is fine

## 10-100 Customers: Early Growth

- Build scalable onboarding
- Implement customer success
- Start content marketing
- Optimize pricing
- Track key metrics (MRR, churn, LTV)

## 100-1000 Customers: Scaling

- Automate everything possible
- Build a sales team
- Invest in customer support
- Expand feature set
- Consider enterprise deals

## Key Metrics to Track

- **MRR**: Monthly Recurring Revenue
- **Churn Rate**: Customers leaving
- **CAC**: Customer Acquisition Cost
- **LTV**: Lifetime Value
- **NPS**: Net Promoter Score

## Common Scaling Mistakes

- Scaling before product-market fit
- Ignoring customer feedback
- Over-hiring too quickly
- Neglecting customer success
- Focusing only on new customers

## Tools for Scaling

- Stripe for payments
- Intercom for support
- Mixpanel for analytics
- HubSpot for CRM

Build a business that grows sustainably!`,
    published: true,
    categoryIds: [3], // Business
  },
  {
    title: "Introduction to Docker and Containers",
    slug: "introduction-docker-containers",
    excerpt: "Learn containerization and how Docker simplifies application deployment.",
    content: `# Introduction to Docker and Containers

Docker has revolutionized how we build, ship, and run applications.

## What is Docker?

Docker packages applications and their dependencies into containers that run consistently anywhere.

## Why Use Docker?

- **Consistency**: Works on my machine = works everywhere
- **Isolation**: Each app runs in its own container
- **Portability**: Deploy anywhere (cloud, on-premise, laptop)
- **Efficiency**: Lighter than virtual machines

## Basic Concepts

### Images
Read-only templates for creating containers.

### Containers
Running instances of images.

### Dockerfile
Instructions for building an image.

## Getting Started

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## Essential Commands

\`\`\`bash
# Build an image
docker build -t myapp .

# Run a container
docker run -p 3000:3000 myapp

# List running containers
docker ps

# Stop a container
docker stop <container-id>
\`\`\`

## Docker Compose

For multi-container applications:

\`\`\`yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: password
\`\`\`

Master Docker and simplify your deployment workflow!`,
    published: true,
    categoryIds: [1, 5], // Technology, Tutorial
  },
  {
    title: "Time Management for Busy Professionals",
    slug: "time-management-busy-professionals",
    excerpt: "Proven techniques to get more done without burning out.",
    content: `# Time Management for Busy Professionals

You can't manage time, but you can manage your priorities.

## Core Principles

### 1. Eisenhower Matrix

Categorize tasks:
- **Urgent & Important**: Do now
- **Important, Not Urgent**: Schedule
- **Urgent, Not Important**: Delegate
- **Neither**: Eliminate

### 2. Time Blocking

Dedicate specific time slots to specific tasks.

Example schedule:
- 9-11 AM: Deep work
- 11-12 PM: Meetings
- 1-3 PM: Emails & admin
- 3-5 PM: Creative work

### 3. The 2-Minute Rule

If it takes less than 2 minutes, do it now.

## Productivity Techniques

### Pomodoro Technique
- Work for 25 minutes
- Break for 5 minutes
- After 4 pomodoros, take 15-30 minutes

### Eat the Frog
Do your hardest task first thing in the morning.

### Batch Similar Tasks
Group emails, calls, or meetings together.

## Digital Tools

- **Calendar**: Google Calendar, Notion
- **Tasks**: Todoist, Things
- **Focus**: Forest app, Freedom
- **Time Tracking**: Toggl, RescueTime

## Common Time Wasters

- Endless meetings
- Social media scrolling
- Email checking every 5 minutes
- Perfectionism
- Saying yes to everything

Learn to protect your time—it's your most valuable asset!`,
    published: true,
    categoryIds: [4], // Lifestyle
  },
  {
    title: "Database Design Best Practices",
    slug: "database-design-best-practices",
    excerpt: "Essential principles for designing efficient and scalable databases.",
    content: `# Database Design Best Practices

Good database design is the foundation of every great application.

## Normalization

### First Normal Form (1NF)
- Eliminate repeating groups
- Each cell contains atomic values
- Each record is unique

### Second Normal Form (2NF)
- Meet 1NF requirements
- Remove partial dependencies
- Every non-key field depends on the whole key

### Third Normal Form (3NF)
- Meet 2NF requirements
- Remove transitive dependencies
- Non-key fields depend only on the primary key

## Naming Conventions

- Use lowercase with underscores: \`user_profiles\`
- Plural for tables: \`users\`, \`posts\`
- Singular for columns: \`user_id\`, \`title\`
- Be consistent throughout

## Indexing Strategies

\`\`\`sql
-- Index frequently queried columns
CREATE INDEX idx_user_email ON users(email);

-- Composite indexes for multi-column queries
CREATE INDEX idx_post_user_date ON posts(user_id, created_at);
\`\`\`

## Relationships

### One-to-Many
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255)
);
\`\`\`

### Many-to-Many
\`\`\`sql
CREATE TABLE post_tags (
  post_id INTEGER REFERENCES posts(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);
\`\`\`

## Performance Tips

1. Index foreign keys
2. Use appropriate data types
3. Avoid NULL when possible
4. Use ENUM for fixed values
5. Consider denormalization for read-heavy tables

## Common Mistakes

- No primary keys
- Missing indexes on foreign keys
- Over-normalization
- Storing computed values
- Using VARCHAR(255) for everything

Design your database with scalability in mind from day one!`,
    published: true,
    categoryIds: [1, 5], // Technology, Tutorial
  },
  {
    title: "Creating Accessible Web Applications",
    slug: "creating-accessible-web-applications",
    excerpt: "Build websites that everyone can use, regardless of their abilities.",
    content: `# Creating Accessible Web Applications

Accessibility isn't optional—it's a fundamental requirement.

## Why Accessibility Matters

- 15% of the world has some form of disability
- Legal requirements (ADA, Section 508)
- Better UX for everyone
- Improves SEO

## WCAG Principles

### 1. Perceivable
Users must be able to perceive the information.

### 2. Operable
Users must be able to operate the interface.

### 3. Understandable
Users must understand the information and interface.

### 4. Robust
Content must work with current and future tools.

## Practical Techniques

### Semantic HTML
\`\`\`html
<!-- Good -->
<button>Click me</button>

<!-- Bad -->
<div onclick="...">Click me</div>
\`\`\`

### ARIA Labels
\`\`\`html
<button aria-label="Close dialog">
  <span aria-hidden="true">&times;</span>
</button>
\`\`\`

### Keyboard Navigation
Ensure all interactive elements are keyboard accessible:
- Tab to navigate
- Enter/Space to activate
- Escape to close modals

### Color Contrast
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Test with tools like WebAIM

### Alt Text for Images
\`\`\`html
<img src="chart.png" alt="Sales increased 25% in Q4">
\`\`\`

## Testing Tools

- Lighthouse (Chrome DevTools)
- axe DevTools
- WAVE browser extension
- Screen readers (NVDA, JAWS, VoiceOver)

## Common Mistakes

- Missing alt text
- Poor color contrast
- No keyboard support
- Auto-playing media
- Unclear error messages

Build for everyone, not just the average user!`,
    published: true,
    categoryIds: [2, 5], // Design, Tutorial
  },
  {
    title: "Monetization Strategies for Side Projects",
    slug: "monetization-strategies-side-projects",
    excerpt: "Turn your hobby project into a sustainable income stream.",
    content: `# Monetization Strategies for Side Projects

You've built something cool. Now let's make it profitable.

## Revenue Models

### 1. SaaS Subscription
Monthly/yearly recurring revenue.

**Pros**: Predictable income, scales well
**Cons**: Requires ongoing support

**Example Pricing**:
- Hobby: $0/month
- Pro: $19/month
- Business: $99/month

### 2. One-Time Purchase
Sell your product once.

**Pros**: Simple, immediate revenue
**Cons**: No recurring income

### 3. Freemium
Free basic version, paid premium features.

**Pros**: Low barrier to entry, upsell potential
**Cons**: Hard to convert free users

### 4. Sponsorships
Companies pay to be featured.

**Pros**: Passive income
**Cons**: Requires significant traffic

### 5. Affiliate Marketing
Earn commission on referrals.

**Pros**: No product needed
**Cons**: Lower margins

## Pricing Psychology

- **Anchor High**: Show expensive option first
- **Odd Pricing**: $29 feels cheaper than $30
- **Annual Discount**: Offer 2 months free on yearly plans
- **Value-Based**: Price on value, not cost

## Payment Processors

- **Stripe**: Best all-around option
- **Paddle**: Handles taxes globally
- **Gumroad**: Great for digital products
- **Lemon Squeezy**: Merchant of record

## Launch Strategy

1. Build in public (Twitter, Reddit)
2. Create landing page early
3. Collect emails before launch
4. Offer early bird discount
5. Ask for testimonials
6. Cross-post on Product Hunt

## Metrics to Track

- MRR (Monthly Recurring Revenue)
- Conversion rate
- Churn rate
- Customer lifetime value
- Customer acquisition cost

Don't be afraid to charge for your work—it validates your project!`,
    published: true,
    categoryIds: [3], // Business
  },
  {
    title: "Advanced React Patterns in 2025",
    slug: "advanced-react-patterns-2025",
    excerpt: "Modern React patterns and best practices for building scalable applications.",
    content: `# Advanced React Patterns in 2025

React has evolved. Here are the patterns that matter in 2025.

## Server Components

The default in Next.js 15:

\`\`\`tsx
// Server Component (default)
async function UserList() {
  const users = await db.query.users.findMany();
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
\`\`\`

Benefits:
- Zero JavaScript to client
- Direct database access
- Automatic code splitting

## Client Components

Only when you need interactivity:

\`\`\`tsx
'use client'

import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
\`\`\`

## Compound Components

\`\`\`tsx
<Tabs defaultValue="code">
  <TabsList>
    <TabsTrigger value="code">Code</TabsTrigger>
    <TabsTrigger value="preview">Preview</TabsTrigger>
  </TabsList>
  <TabsContent value="code">...</TabsContent>
  <TabsContent value="preview">...</TabsContent>
</Tabs>
\`\`\`

## Render Props (Still Useful)

\`\`\`tsx
<DataFetcher url="/api/users">
  {({ data, loading }) => 
    loading ? <Spinner /> : <UserList users={data} />
  }
</DataFetcher>
\`\`\`

## Custom Hooks

Extract reusable logic:

\`\`\`tsx
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  
  return debounced
}
\`\`\`

## Error Boundaries

\`\`\`tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false }
  
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  
  render() {
    if (this.state.hasError) return <ErrorFallback />
    return this.props.children
  }
}
\`\`\`

## Best Practices 2025

1. Server Components by default
2. Client Components only when needed
3. Co-locate related code
4. Use TypeScript
5. Optimize with \`useMemo\` and \`useCallback\`
6. Proper error handling
7. Accessible components

Stay current with React's evolution!`,
    published: true,
    categoryIds: [1, 5], // Technology, Tutorial
  },
  {
    title: "Building Your Personal Brand as a Developer",
    slug: "building-personal-brand-developer",
    excerpt: "Stand out in the tech industry by creating a strong personal brand.",
    content: `# Building Your Personal Brand as a Developer

Your personal brand is your reputation. Here's how to build it.

## Why Personal Branding Matters

- Better job opportunities
- Higher rates as a freelancer
- Speaking opportunities
- Networking advantages
- Side project traction

## Content Platforms

### Twitter/X
- Share quick tips and insights
- Engage with the dev community
- Thread longer tutorials
- Build in public

### LinkedIn
- Professional updates
- Articles and posts
- Network with recruiters
- Showcase projects

### Personal Blog
- In-depth tutorials
- Your thoughts on tech trends
- SEO benefits
- Full ownership

### YouTube
- Video tutorials
- Live coding sessions
- Tech reviews
- Project walkthroughs

## Content Ideas

1. **Tutorials**: Teach what you're learning
2. **Project Updates**: Build in public
3. **Hot Takes**: Share opinions on tech trends
4. **Tips & Tricks**: Quick wins for developers
5. **Career Advice**: Share your journey
6. **Code Reviews**: Analyze popular repos
7. **Tool Reviews**: What you use and why

## Consistency is Key

Don't post once and disappear. Show up regularly:
- Twitter: Daily
- Blog: Weekly
- YouTube: Bi-weekly
- LinkedIn: 2-3x per week

## Engagement Strategies

- Reply to comments
- Ask questions
- Collaborate with others
- Share others' content
- Join communities

## Common Mistakes

- Trying to please everyone
- Inconsistent posting
- Only self-promotion
- Copying others
- Being too salesy

## Tools to Use

- Buffer/Typefully for scheduling
- Canva for graphics
- Notion for content planning
- Analytics to track growth

Start today—you're already building a brand whether you realize it or not.

Make it intentional!`,
    published: true,
    categoryIds: [3, 4], // Business, Lifestyle
  },
  // Draft posts
  {
    title: "Understanding Microservices Architecture",
    slug: "understanding-microservices-architecture",
    excerpt: "A deep dive into microservices, when to use them, and common pitfalls.",
    content: `# Understanding Microservices Architecture

*Draft: Content coming soon...*

This article will cover:
- What are microservices?
- Monolith vs Microservices
- When to use microservices
- Common patterns and anti-patterns
- Tools and technologies`,
    published: false,
    categoryIds: [1, 5],
  },
  {
    title: "Mastering Figma for Developers",
    slug: "mastering-figma-developers",
    excerpt: "How developers can leverage Figma to improve collaboration with designers.",
    content: `# Mastering Figma for Developers

*Draft: Work in progress...*

Topics to cover:
- Figma basics for devs
- Using Dev Mode
- Extracting assets
- Understanding design systems
- Collaboration tips`,
    published: false,
    categoryIds: [2, 5],
  },
];

async function seed() {
  console.log("🌱 Starting database seed...\n");

  try {
    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(postCategories);
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(posts);
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(categories);
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(users);
    console.log("✅ Existing data cleared\n");

    // Insert default user
    console.log("👤 Creating default user...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const [defaultUser] = await db
      .insert(users)
      .values({
        username: "admin",
        password: hashedPassword,
      })
      .returning();
    console.log(`✅ Created user: ${defaultUser!.username}\n`);

    // Insert categories
    console.log("📁 Inserting categories...");
    const insertedCategories = await db
      .insert(categories)
      .values(sampleCategories)
      .returning();
    console.log(`✅ Inserted ${insertedCategories.length} categories\n`);

    // Create category mapping by slug for dynamic IDs
    const categoryMap = new Map(
      insertedCategories.map((cat) => [cat.slug, cat.id])
    );
    const techId = categoryMap.get("technology")!;
    const designId = categoryMap.get("design")!;
    const businessId = categoryMap.get("business")!;
    const lifestyleId = categoryMap.get("lifestyle")!;
    const tutorialId = categoryMap.get("tutorial")!;

    // Insert posts and their category relationships
    console.log("📝 Inserting posts and relationships...");
    for (const post of samplePosts) {
      const { categoryIds: oldCategoryIds, ...postData } = post;
      
      // Map old category IDs to new ones
      let categoryIds: number[] = [];
      if (oldCategoryIds) {
        categoryIds = oldCategoryIds.map((oldId) => {
          switch (oldId) {
            case 1: return techId;
            case 2: return designId;
            case 3: return businessId;
            case 4: return lifestyleId;
            case 5: return tutorialId;
            default: return techId;
          }
        });
      }
      
      // Insert post with userId
      const [insertedPost] = await db
        .insert(posts)
        .values({
          ...postData,
          userId: defaultUser!.id,
        })
        .returning();

      // Insert post-category relationships
      if (insertedPost && categoryIds && categoryIds.length > 0) {
        const relationships = categoryIds.map((categoryId) => ({
          postId: insertedPost.id,
          categoryId,
        }));
        
        await db.insert(postCategories).values(relationships);
      }

      if (insertedPost) {
        console.log(`  ✓ ${insertedPost.title} (${post.published ? 'published' : 'draft'})`);
      }
    }

    console.log(`\n✅ Inserted ${samplePosts.length} posts with relationships\n`);

    // Summary
    console.log("📊 Seed Summary:");
    console.log(`  • 1 user created (username: admin, password: password123)`);
    console.log(`  • ${insertedCategories.length} categories`);
    console.log(`  • ${samplePosts.filter(p => p.published).length} published posts`);
    console.log(`  • ${samplePosts.filter(p => !p.published).length} draft posts`);
    console.log(`  • ${samplePosts.length} total posts`);
    
    console.log("\n🎉 Database seeded successfully!");
    console.log("\n🔑 Login credentials:");
    console.log("   Username: admin");
    console.log("   Password: password123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }

  process.exit(0);
}

void seed();

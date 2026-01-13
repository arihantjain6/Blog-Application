# Interview Explanation - Blog Application

## Quick Introduction (30 seconds)

"This is a full-stack blog application where users can sign up, log in, create blog posts with images, comment on posts, and see who else is currently viewing the same post in real-time."

---

## Tech Stack Overview

### Frontend

| Technology       | Version | What It Does                                               |
| ---------------- | ------- | ---------------------------------------------------------- |
| **Next.js**      | 16      | React framework with server-side rendering and App Router  |
| **React**        | 19      | UI library for building components                         |
| **Tailwind CSS** | 4       | Utility-first CSS framework for styling                    |
| **Radix UI**     | Latest  | Accessible, unstyled components (dropdowns, avatars, etc.) |
| **Lucide React** | Latest  | Icon library                                               |

### Backend

| Technology      | What It Does                                                            |
| --------------- | ----------------------------------------------------------------------- |
| **Convex**      | Real-time database & serverless backend (no separate API server needed) |
| **Better Auth** | Authentication system for email/password login                          |

### Form Handling & Validation

| Technology          | What It Does                                           |
| ------------------- | ------------------------------------------------------ |
| **React Hook Form** | Handles form state and submission                      |
| **Zod**             | Schema validation (validates user input before saving) |

---

## Application Flow - How Each Feature Works

### 1. Authentication Flow (Sign Up / Login)

**Files involved:**

- `app/auth/sign-up/page.tsx` - Sign up page
- `convex/auth.ts` - Backend auth configuration
- `lib/auth-client.ts` - Frontend auth client
- `app/api/auth/[...all]/route.ts` - API routes for auth

**How it works:**

1. User fills sign-up form with email and password
2. Frontend sends request to `/api/auth/sign-up/email`
3. Better Auth creates user in Convex database
4. User gets logged in and receives a session token
5. Token is stored in browser and sent with every request

**When asked: "Why Better Auth with Convex?"**

> "Better Auth is a modern authentication library. I used the `@convex-dev/better-auth` plugin which provides seamless integration - it stores users directly in Convex database and handles session management automatically."

---

### 2. Creating a Blog Post

**Files involved:**

- `app/(shared-layout)/create/page.tsx` - Create post form
- `app/actions.ts` - Server actions
- `convex/posts.ts` - Backend mutations

**How it works:**

1. User fills form (title, content, image)
2. React Hook Form validates input using Zod schema
3. Image gets uploaded to Convex file storage first
4. `createPost` mutation saves post with image ID
5. Post appears immediately (real-time update)

**Simple explanation:**

> "When user creates a post, first I upload the image to Convex storage and get back a storage ID. Then I save the post with title, content, and that image ID. Convex automatically generates the image URL when we query posts."

---

### 3. Displaying Blog Posts

**Files involved:**

- `convex/posts.ts` - `getPosts` and `getPostById` queries
- `app/(shared-layout)/blog/[postId]/page.tsx` - Individual post page

**How it works:**

1. `getPosts` query fetches all posts from database
2. For each post, we resolve the image URL from storage ID
3. Posts are ordered by creation time (newest first)
4. Dynamic routes `[postId]` show individual posts

**Key code pattern:**

```typescript
// Getting image URL from storage ID
const imageUrl = await ctx.storage.getUrl(post.imageStorageId);
```

---

### 4. Full-Text Search

**Files involved:**

- `convex/schema.ts` - Search index definition
- `convex/posts.ts` - `searchPosts` query

**How it works:**

1. Schema defines search indexes on `title` and `body` fields
2. When user searches, we first search titles
3. If not enough results, we also search body content
4. We use a `Set` to avoid duplicate results

**Key code explanation:**

```typescript
// Schema with search indexes
.searchIndex("search_title", { searchField: "title" })
.searchIndex("search_body", { searchField: "body" })
```

**When asked: "Why two separate search indexes?"**

> "Title matches are usually more relevant, so I search titles first. If I don't get enough results, I also search the body. The Set prevents showing the same post twice if it matches both."

---

### 5. Real-Time Presence (Who's Viewing)

**Files involved:**

- `convex/presence.ts` - Presence backend
- `components/web/PostPresence.tsx` - UI component

**How it works:**

1. When user opens a post, they send a "heartbeat" to the server
2. Heartbeat includes room ID (post ID), user ID, and session ID
3. Server tracks who's currently viewing each post
4. Other users see who's online in real-time
5. When user leaves, presence is removed

**Simple explanation:**

> "It's like Discord or Google Docs - you can see who else is viewing the same post right now. Users send periodic 'I'm still here' signals called heartbeats."

---

### 6. Comments System

**Files involved:**

- `convex/comments.ts` - Comment mutations and queries
- `convex/schema.ts` - Comments table definition
- `components/web/CommentSection.tsx` - Comments UI

**How it works:**

1. Comments are stored with: `postId`, `body`, `authorName`, `authorId`
2. `getCommentsByPostId` fetches comments for a specific post
3. New comments appear instantly (real-time)

---

## Database Schema Explanation

```typescript
// convex/schema.ts
posts: defineTable({
  title: v.string(), // Post title
  body: v.string(), // Post content
  authorId: v.string(), // Who created it
  imageStorageId: v.id("_storage"), // Reference to uploaded image
});

comments: defineTable({
  postId: v.id("posts"), // Which post this belongs to
  body: v.string(), // Comment text
  authorName: v.string(), // Commenter's name
  authorId: v.string(), // Commenter's user ID
});
```

---

## Key Architecture Decisions

### 1. Why Convex instead of traditional API?

> "Convex handles both database AND API in one place. I don't need to write REST endpoints - I just write TypeScript functions that directly query the database. It also gives me real-time updates automatically."

### 2. Why App Router (not Pages Router)?

> "App Router is the modern Next.js approach. It supports React Server Components, which means faster page loads because we can fetch data on the server before sending HTML to the browser."

### 3. Why Server Actions?

> "Server actions let me call backend functions directly from my React components without creating API routes. For example, creating a blog post calls a server action that then talks to Convex."

### 4. Why React Hook Form + Zod?

> "React Hook Form handles the form state efficiently - it doesn't re-render the whole form on every keystroke. Zod validates the data both on client (for fast feedback) and can validate on server too (for security)."

### 5. Why Tailwind CSS?

> "Tailwind lets me style directly in my JSX without switching between files. It's faster for development and the production CSS is very small because unused styles are removed."

---

## Project Structure Quick Reference

```
learn/
├── app/                      # Next.js App Router pages
│   ├── (shared-layout)/      # Pages with shared layout
│   │   ├── blog/             # Blog listing & individual posts
│   │   └── create/           # Create post page
│   ├── auth/                 # Login & sign-up pages
│   ├── api/                  # API routes
│   └── layout.tsx            # Root layout with providers
├── components/               # Reusable React components
│   ├── ui/                   # UI components (Button, Card, etc.)
│   └── web/                  # Feature components
├── convex/                   # Backend code
│   ├── auth.ts               # Authentication setup
│   ├── posts.ts              # Post CRUD operations
│   ├── comments.ts           # Comments functionality
│   ├── presence.ts           # Real-time presence
│   └── schema.ts             # Database schema
└── lib/                      # Utility functions & configs
```

---

## Common Interview Questions

**Q: How does file upload work?**

> "First, I call `generateUploadUrl` to get a signed URL from Convex. Then I upload the image file to that URL. Convex returns a storage ID which I save with the post. When displaying, I call `ctx.storage.getUrl()` to convert the storage ID back to a viewable URL."

**Q: How do you protect routes?**

> "I check authentication in two places: 1) Backend mutations/queries use `authComponent.safeGetAuthUser(ctx)` to verify the user. 2) Frontend pages check userId and redirect to login if not authenticated."

**Q: What makes Convex different from Firebase?**

> "Convex is TypeScript-first - I write my backend logic in TypeScript functions. It has built-in reactivity, so when data changes, subscribed components update automatically. Also, the database schema is defined in code, not in a web console."

**Q: How does real-time work?**

> "Convex uses subscriptions. When I use the `useQuery` hook from Convex React, it automatically listens for changes. If another user adds a post or comment, all connected clients see it instantly without refreshing."

---

## Deployment

**What I used:**

- **Frontend**: Vercel (automatic deployment from GitHub)
- **Backend**: Convex Cloud (automatic deployment with `npx convex deploy`)

**When asked about deployment:**

> "I deploy the frontend to Vercel which handles the Next.js server-side rendering. The Convex backend is deployed to Convex Cloud with a single command. They communicate securely using the Convex URL stored in environment variables."

---

## Summary Points to Remember

1. **Full-stack TypeScript** - Same language frontend to backend
2. **Real-time by default** - Changes sync instantly across all users
3. **Modern React patterns** - Server Components, Server Actions
4. **Secure by design** - Auth checks on every mutation
5. **Scalable architecture** - Serverless, no server management needed

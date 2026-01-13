# React Components & React Server Components Explained

A comprehensive guide to understanding React Components and React Server Components for interviews.

---

## 🧩 What is a React Component?

### Simple Explanation

A **React Component** is like a **LEGO block** for building websites. Just like how you combine LEGO blocks to build something bigger, you combine React components to build a complete web application.

### Technical Definition

A React Component is a **reusable piece of UI** that:

- Accepts inputs (called **props**)
- Returns JSX (JavaScript + HTML) that describes what should appear on screen
- Can have its own **state** (internal data that can change)

### Two Types of Components

#### 1. Functional Components (Modern Way ✅)

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Pratik" />;
```

#### 2. Class Components (Old Way)

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Key Characteristics

| Feature        | Description                             |
| -------------- | --------------------------------------- |
| **Reusable**   | Write once, use anywhere in your app    |
| **Composable** | Components can contain other components |
| **Isolated**   | Each component manages its own logic    |
| **Props**      | Data passed from parent to child        |
| **State**      | Internal data that can change over time |

### Real-World Analogy

Think of a **Button component**:

- You define it once with styling and behavior
- You can use it 100 times across your app
- Each button can have different text (props) but same look/feel

---

## 🖥️ Client Components vs Server Components

Before understanding Server Components, let's understand where React code traditionally runs:

### Traditional React (Client Components)

- All JavaScript runs in the **browser**
- User downloads ALL the code
- Everything happens on the user's device

```jsx
"use client"; // This marks it as a Client Component

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
}
```

---

## 🌐 What is a React Server Component (RSC)?

### Simple Explanation

A **React Server Component** is a component that runs **on the server**, not in the browser. The server does the heavy lifting, and only the final HTML is sent to the user.

### Technical Definition

Server Components are React components that:

- Execute **only on the server**
- Can directly access databases, file systems, and backend resources
- Send **zero JavaScript** to the browser
- Cannot use browser-specific features (like `useState`, `onClick`)

### How It Works

```
┌─────────────────────────────────────────────────────────┐
│                     SERVER                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Server Component                                │   │
│  │  - Fetches data from database                   │   │
│  │  - Processes data                               │   │
│  │  - Renders to HTML                              │   │
│  └─────────────────────────────────────────────────┘   │
│                        │                                 │
│                        ▼                                 │
│              Sends HTML (no JS!)                        │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                     BROWSER                              │
│  User sees the content immediately!                     │
│  (No waiting for JavaScript to load)                    │
└─────────────────────────────────────────────────────────┘
```

### Server Component Example

```jsx
// This is a Server Component (default in Next.js App Router)
// NO 'use client' directive

async function BlogPosts() {
  // 👇 Direct database access! Not possible in client components
  const posts = await db.query("SELECT * FROM posts");

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

---

## 🔄 Server Components vs Client Components

| Feature                   | Server Component | Client Component |
| ------------------------- | ---------------- | ---------------- |
| **Runs on**               | Server only      | Browser          |
| **JavaScript sent**       | None (0 KB)      | All code         |
| **Can use `useState`**    | ❌ No            | ✅ Yes           |
| **Can use `onClick`**     | ❌ No            | ✅ Yes           |
| **Can access database**   | ✅ Yes           | ❌ No            |
| **Can use `async/await`** | ✅ Yes           | ⚠️ Limited       |
| **Initial load**          | ⚡ Fast          | 🐢 Slower        |
| **Interactivity**         | ❌ Static        | ✅ Interactive   |

---

## 🎯 When to Use Which?

### Use Server Components When:

- ✅ Fetching data from a database
- ✅ Accessing backend resources (files, APIs)
- ✅ Keeping sensitive data on server (API keys, tokens)
- ✅ Reducing JavaScript bundle size
- ✅ SEO is important (content is pre-rendered)

### Use Client Components When:

- ✅ Need user interactivity (clicks, inputs)
- ✅ Using React hooks (`useState`, `useEffect`)
- ✅ Using browser APIs (localStorage, geolocation)
- ✅ Need event listeners
- ✅ Using third-party libraries that need browser

---

## 🏗️ Practical Example: Your Blog Project

In your project, here's how components are used:

### Server Component (Fetching Blog Posts)

```jsx
// app/blog/page.tsx - SERVER COMPONENT
async function BlogPage() {
  const posts = await convex.query(api.posts.getAll); // Server-side fetch

  return (
    <div>
      <h1>My Blog</h1>
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
```

### Client Component (Interactive Button)

```jsx
// components/LikeButton.tsx - CLIENT COMPONENT
"use client";

import { useState } from "react";

function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>{liked ? "❤️" : "🤍"}</button>
  );
}
```

### Combining Both

```jsx
// Server Component containing a Client Component
async function BlogPost({ id }) {
  const post = await getPost(id); // Server-side

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton postId={id} /> {/* Client Component for interactivity */}
    </article>
  );
}
```

---

## 🗣️ Interview-Ready Answers

### Q: "What is a React Component?"

> "A React Component is a reusable building block of UI. It's like a function that takes props as input and returns JSX describing what should appear on screen. Components can be composed together to build complex UIs, and each component can manage its own state and logic."

### Q: "What are React Server Components?"

> "React Server Components are components that run exclusively on the server. They can directly access databases and backend resources, and they send zero JavaScript to the browser - only the rendered HTML. This makes the initial page load faster and reduces bundle size. However, they can't use browser features like useState or onClick, so we combine them with Client Components for interactivity."

### Q: "When would you choose Server Components over Client Components?"

> "I'd use Server Components when fetching data, accessing backend resources, or when the component doesn't need interactivity. For example, a blog post list that just displays data. I'd use Client Components when I need user interactions like buttons, forms, or when using React hooks like useState. Often, I compose both together - a Server Component fetches data and a nested Client Component handles the interactive parts."

---

## 📚 Key Takeaways

1. **React Components** = Reusable UI building blocks
2. **Server Components** = Run on server, no JS sent to browser, can access backend
3. **Client Components** = Run in browser, enable interactivity, use hooks
4. **Best Practice** = Use Server Components by default, add `'use client'` only when needed
5. **Next.js App Router** = Server Components are the default

---

> 💡 **Pro Tip**: In Next.js 13+ with App Router, all components are Server Components by default. You only add `'use client'` at the top of a file when you need browser features.

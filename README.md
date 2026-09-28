<div align="center">

# 🎥 MeetFlowAI

**AI-powered video meetings. Create custom AI agents, invite them into live calls, and get transcripts and summaries automatically.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://meet-flow-ai-seven.vercel.app/)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-11-2596BE?logo=trpc&logoColor=white)
![Postgres](https://img.shields.io/badge/Neon-Postgres-00E599)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white)

[Live Demo](https://meet-flow-ai-seven.vercel.app/) · [Report a Bug](https://github.com/arihantjain6/MeetFlowAI/issues) · [Request a Feature](https://github.com/arihantjain6/MeetFlowAI/issues)

</div>

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [How It Works](#how-it-works)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Environment Variables](#environment-variables)
8. [Database](#database)
9. [Webhooks and Background Jobs](#webhooks-and-background-jobs)
10. [Available Scripts](#available-scripts)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)
13. [Roadmap](#roadmap)
14. [Contributing](#contributing)
15. [Author](#author)

---

## Overview

MeetFlowAI turns meetings into structured, searchable knowledge. You define **AI agents** with their own personality and instructions, start a **video meeting**, and let the agent join the call. When the meeting ends, the platform processes the recording in the background and produces a **transcript and AI-generated summary** you can review later.

It combines real-time video and chat, an end-to-end type-safe API, serverless Postgres, background job orchestration and subscription billing.

## Features

**AI agents**
- Create agents with a name, generated avatar (DiceBear) and custom instructions
- Manage, search and filter your agents in a data table
- Assign an agent to any meeting

**Meetings**
- Schedule and start live video calls with Stream Video
- In-call chat with Stream Chat
- Meeting states from upcoming to active, completed, processing and cancelled
- Meeting history with pagination, filters and search-highlighting

**Post-call intelligence**
- Automatic transcript generation after the call
- AI summary of key points and action items using Google Gemini
- Transcript viewer with searchable text, and summaries rendered as Markdown
- Background processing through Inngest, so the UI never blocks

**Accounts and billing**
- Email/password and social auth with Better Auth
- Subscription plans and usage limits through Polar

**UI and experience**
- Responsive dashboard with command palette (`cmdk`), drawers, carousels and resizable panels
- Charts with Recharts
- Light and dark mode
- Loading and error boundaries across routes

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| API layer | tRPC 11, TanStack Query, TanStack Table |
| Database | Neon serverless Postgres, Drizzle ORM and Drizzle Kit |
| Authentication | Better Auth |
| Video and chat | Stream Video React SDK, Stream Chat, Stream Node SDK |
| AI | Google Gemini via `@google/genai` |
| Background jobs | Inngest |
| Payments | Polar (`@polar-sh/sdk`, `@polar-sh/better-auth`) |
| Styling and UI | Tailwind CSS 4, shadcn/ui, Radix UI, Base UI, Vaul, cmdk |
| State and forms | nuqs (URL state), React Hook Form, Zod |
| Utilities | date-fns, nanoid, humanize-duration, react-markdown |

## How It Works

```mermaid
sequenceDiagram
    participant U as User
    participant App as Next.js + tRPC
    participant DB as Neon Postgres
    participant S as Stream Video
    participant I as Inngest
    participant G as Gemini

    U->>App: Create agent and schedule meeting
    App->>DB: Save agent and meeting
    U->>S: Join video call
    S-->>App: Webhook (call started, ended, transcript ready)
    App->>DB: Update meeting status
    App->>I: Queue post-call job
    I->>G: Summarise transcript
    G-->>I: Summary
    I->>DB: Store transcript and summary
    U->>App: Open completed meeting
    App-->>U: Recording, transcript and summary
```

1. **Setup:** a signed-in user creates an agent and a meeting that uses it.
2. **Live call:** Stream hosts the video and chat session, and the agent participates.
3. **Webhooks:** Stream notifies the app of call lifecycle events.
4. **Processing:** an Inngest function fetches the transcript, sends it to Gemini and saves the summary.
5. **Review:** the meeting page shows the summary, transcript and history.

## Project Structure

```
MeetFlowAI/
├── public/                # Static assets
├── src/
│   ├── app/               # App Router pages, layouts and API routes (auth, tRPC, webhooks, Inngest)
│   ├── components/        # Shared UI components
│   ├── db/                # Drizzle schema and database client
│   ├── inngest/           # Background job definitions
│   ├── lib/               # Auth, Stream and Polar clients, helpers
│   ├── modules/           # Feature modules (agents, meetings, auth, dashboard, premium)
│   └── trpc/              # tRPC routers, context and client setup
├── drizzle.config.ts      # Drizzle Kit configuration
├── components.json        # shadcn/ui configuration
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

> Folder names inside `src/` are a typical layout for this stack. Adjust if yours differs.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A [Neon](https://neon.tech) Postgres database
- API keys for [Stream](https://getstream.io), [Google AI Studio](https://aistudio.google.com), [Inngest](https://www.inngest.com) and [Polar](https://polar.sh)
- [ngrok](https://ngrok.com), for receiving webhooks on localhost

### Installation

```bash
git clone https://github.com/arihantjain6/MeetFlowAI.git
cd MeetFlowAI
npm install
```

### Configure and run

```bash
cp .env.example .env      # or create .env manually (see below)
npm run db:push           # create tables in Neon
npm run dev               # http://localhost:3000
```

In a second terminal, expose your server for webhooks:

```bash
npm run dev:webhook       # ngrok http 3000
```

Copy the ngrok HTTPS URL into the Stream dashboard as the webhook endpoint, for example `https://<id>.ngrok-free.app/api/webhook`.

To run background jobs locally, start the Inngest dev server:

```bash
npx inngest-cli@latest dev
```

## Environment Variables

Create a `.env` file in the project root.

```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Auth
BETTER_AUTH_SECRET=change-me
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stream Video
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=
STREAM_VIDEO_SECRET_KEY=

# Stream Chat
NEXT_PUBLIC_STREAM_CHAT_API_KEY=
STREAM_CHAT_SECRET_KEY=

# AI
GEMINI_API_KEY=

# Polar (billing)
POLAR_ACCESS_TOKEN=

# Inngest (production only)
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

> ⚠️ Never commit `.env`. Rename variables to match what your code reads.

## Database

Schema is managed with Drizzle ORM.

| Command | Purpose |
| --- | --- |
| `npm run db:push` | Sync the schema in `src/db/schema.ts` to Neon |
| `npm run db:studio` | Open Drizzle Studio to browse and edit data |

Core tables, typically: `user`, `session`, `account`, `verification` (Better Auth), `agents` and `meetings`.

## Webhooks and Background Jobs

| Service | Purpose | Local setup |
| --- | --- | --- |
| Stream | Call started, ended, transcription ready, recording ready | ngrok tunnel to `/api/webhook` |
| Inngest | Runs summarisation as a durable background function | `npx inngest-cli dev` |
| Polar | Subscription events | Add endpoint in the Polar dashboard |

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |
| `npm run db:push` | Push the Drizzle schema to the database |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run dev:webhook` | Expose port 3000 with ngrok |

## Deployment

1. Push the repository to GitHub and import it into [Vercel](https://vercel.com/new).
2. Add every environment variable above in the Vercel dashboard.
3. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain.
4. Point the Stream and Polar webhooks to the production URL.
5. Register your app in the Inngest dashboard so it can sync functions from `/api/inngest`.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Meeting never leaves "processing" | Check the Stream webhook URL and that Inngest is running |
| Webhook returns 404 or 401 | Ngrok URL changed. Update it in the Stream dashboard |
| Database errors on first run | Run `npm run db:push` and verify `DATABASE_URL` includes `sslmode=require` |
| Video does not connect | Verify Stream key and secret pair, and allow camera and microphone in the browser |
| Summary is empty | Confirm `GEMINI_API_KEY` is valid and the transcript exists |

## Roadmap

- [ ] Action-item extraction with assignees
- [ ] Ask-questions-about-a-meeting chat over transcripts
- [ ] Calendar integrations
- [ ] Team workspaces and shared agents
- [ ] Export summaries to PDF and Notion

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit and push your changes
4. Open a Pull Request

## Author

**Arihant Jain**, [@arihantjain6](https://github.com/arihantjain6)

If you find this useful, please give it a ⭐

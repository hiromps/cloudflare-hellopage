# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Template Repository Overview

This is a **Cloudflare Pages Template** repository featuring Next.js 14 with API routes, shadcn/ui components, and dark mode support. Use this as a starting point for new projects requiring Cloudflare deployment with a modern tech stack.

### Quick Start for New Projects

```bash
# Clone this template
git clone <this-repo-url> my-new-project
cd my-new-project

# Remove git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit from cloudflare-hellopage template"

# Install and run
npm install
npm run dev
```

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint check
npm run lint

# Add new shadcn/ui components
npx shadcn@latest add <component-name>

# Test API endpoints
curl http://localhost:3000/api/hello
curl http://localhost:3000/api/users
curl http://localhost:3000/api/time
```

## Architecture Overview

### What's Included in This Template

- ✅ **Next.js 14** with App Router and API Routes
- ✅ **shadcn/ui** components pre-configured (New York style)
- ✅ **Dark/Light mode** with next-themes
- ✅ **Tailwind CSS** with custom gradients and glassmorphism
- ✅ **TypeScript** setup (non-strict mode)
- ✅ **Cloudflare Pages** ready configuration
- ✅ **Sample API endpoints** (hello, users, time)
- ✅ **Interactive UI** with real-time updates
- ✅ **Responsive design** with mobile support

### Project Structure

**API Routes** (`app/api/*/route.ts`):
- All API endpoints use Next.js Route Handlers
- Returns JSON with consistent `status` field
- In-memory data storage (no database)
- Three endpoints: `/hello`, `/users`, `/time`

**UI Components**:
- shadcn/ui components in `components/ui/`
- Theme provider wraps the entire app for dark mode
- Custom hooks in `hooks/`
- Utility functions in `lib/utils`

**Client-Server Pattern**:
- Main page (`app/page.tsx`) is a Client Component
- Uses `fetch` API to interact with backend
- Real-time updates via `setInterval` for time display
- State management with React hooks

### Critical Configuration

**next.config.js**:
- Do NOT add `output: 'export'` - this disables API routes
- `trailingSlash: true` for Cloudflare Pages compatibility
- `images.unoptimized: true` for static image optimization

**TypeScript Path Aliases**:
- `@/*` maps to project root
- Used for clean imports: `@/components/ui/card`

**Theme System**:
- Uses next-themes with system preference detection
- CSS variables defined in `app/globals.css`
- Light/dark mode toggle in UI

### Cloudflare Pages Deployment

**Build Settings**:
- Framework preset: Next.js
- Build command: `npm run build`
- Build output: `out`
- Static export with Cloudflare Functions for API

**API Routes**:
- Located in `functions/api/` directory
- Uses Cloudflare Functions (not Next.js API routes)
- Accessible at `/api/*` paths

**wrangler.toml**:
- Configured for Cloudflare Pages deployment
- Compatibility date set to "2023-12-01"

### API Response Format

All APIs follow this structure:
```json
{
  "status": "success" | "error",
  "message": "...",
  // additional data fields
}
```

### Common Issues & Solutions

**API Routes Not Working**:
- Cloudflare Functions are in `functions/api/` directory
- Make sure functions use `export async function onRequest(context)`
- API routes accessible at `/api/*` paths

**Dark Mode Not Applying**:
- Verify ThemeProvider wraps the app in layout.tsx
- Check `suppressHydrationWarning` on html element

**Cloudflare Build Fails**:
- Use `out` as output directory for static export
- Ensure `output: 'export'` is in next.config.js
- API functions must be in `functions/` directory

## Template Customization Guide

When using this template for a new project:

1. **Update package.json**:
   - Change `"name"` field to your project name
   - Update `"version"` as needed

2. **Modify API endpoints**:
   - Replace sample endpoints in `app/api/` with your own
   - Follow the existing pattern for consistency

3. **Customize UI**:
   - Main page is in `app/page.tsx`
   - Add new shadcn components with `npx shadcn@latest add <component>`
   - Theme colors can be modified in `app/globals.css`

4. **Environment Setup**:
   - Copy `.env.example` to `.env.local`
   - Add your environment variables

5. **Deploy to Cloudflare**:
   - Push to GitHub
   - Connect repo in Cloudflare Pages
   - Use build settings from this documentation

## Template Features for Different Use Cases

### For API-First Applications
- Keep all API routes in `app/api/`
- Remove sample UI components if not needed
- Focus on backend logic

### For Full-Stack Applications
- Use existing structure as-is
- Add database integration as needed
- Expand API routes and UI components

### For Static Sites with API
- Keep minimal API routes
- Focus on frontend development
- Use ISR/SSG where possible

This template provides maximum flexibility for Cloudflare Pages deployment across different project types.
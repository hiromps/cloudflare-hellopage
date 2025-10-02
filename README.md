# Cloudflare Pages Next.js Template

A modern, production-ready template for Next.js static sites with Cloudflare Functions API, shadcn/ui components, and dark mode support.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-purple)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)
![Cloudflare Functions](https://img.shields.io/badge/Cloudflare-Functions-orange)

## 🚀 Features

- **Next.js 14** with App Router (Static Export)
- **Cloudflare Functions** for serverless API endpoints
- **shadcn/ui** components pre-configured (New York style)
- **Dark/Light mode** toggle with next-themes
- **Tailwind CSS** with beautiful gradients and glassmorphism
- **TypeScript** support
- **Cloudflare Pages** optimized configuration
- **Edge Runtime** API with global distribution
- **Responsive design** with mobile-first approach
- **Real-time updates** demonstration

## 📸 Preview

- Beautiful gradient background with glassmorphic cards
- Interactive dashboard with tabs
- User management interface
- API endpoint documentation
- Dark mode support

## 🏃‍♂️ Quick Start

### Use as Template

```bash
# Clone this template
git clone https://github.com/hiromps/cloudflare-hellopage.git my-project
cd my-project

# Remove git history and start fresh
rm -rf .git
git init

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📦 What's Included

```
cloudflare-hellopage/
├── app/
│   ├── api/          # Next.js API routes (for local dev)
│   │   ├── hello/
│   │   ├── users/
│   │   └── time/
│   ├── globals.css   # Global styles and theme
│   ├── layout.tsx    # Root layout with theme provider
│   └── page.tsx      # Main page with UI components
├── functions/        # Cloudflare Functions
│   └── api/
│       ├── hello.js  # Hello API endpoint
│       ├── users.js  # Users management API
│       └── time.js   # Server time API
├── components/
│   ├── ui/           # shadcn/ui components
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts      # Utility functions
├── public/           # Static assets
├── out/              # Build output (after npm run build)
├── .env.example      # Environment variables template
├── components.json   # shadcn/ui configuration
├── next.config.js    # Next.js configuration (static export)
├── tailwind.config.ts # Tailwind configuration
├── tsconfig.json     # TypeScript configuration
└── wrangler.toml     # Cloudflare configuration
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Adding Components

Add new shadcn/ui components easily:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# etc...
```

### API Endpoints

Cloudflare Functions endpoints (production):

- `GET /api/hello` - Welcome message
- `GET/POST /api/users` - User management
- `GET /api/time` - Server time with timezone

**Note**: API endpoints are powered by Cloudflare Functions in production and Next.js API routes in local development.

## 🚀 Deployment

### Cloudflare Pages

1. Push your code to GitHub

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages

3. Create a new project and connect your GitHub repository

4. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `out`

5. Deploy!

### Environment Variables

Copy `.env.example` to `.env.local` and add your environment variables:

```bash
cp .env.example .env.local
```

## 🎨 Customization

### Theme

Modify theme colors in `app/globals.css`:

- CSS variables for light/dark mode
- Tailwind configuration in `tailwind.config.ts`
- shadcn/ui configuration in `components.json`

### API Routes

Add new API routes in `app/api/` directory following Next.js App Router conventions:

```typescript
// app/api/your-endpoint/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello!' });
}
```

## 📝 Important Notes

### Architecture

This template uses a **hybrid approach**:
- **Frontend**: Static site export from Next.js (`output: 'export'`)
- **Backend**: Cloudflare Functions for API endpoints
- **Local Dev**: Next.js API routes for development convenience

### API Routes Configuration

- **Production**: Cloudflare Functions in `functions/api/` directory
- **Development**: Next.js API routes in `app/api/` directory
- Both use the same API structure for consistency

### Cloudflare Compatibility

- Uses `out` build output for static export
- Configured with `trailingSlash: true`
- Images optimized for static delivery
- API handled by Cloudflare Functions at edge

## 🤝 Contributing

Feel free to use this template for your projects! If you have improvements:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This template is open source and available for anyone to use.

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## 🏗️ Technology Stack

- **Frontend Framework**: Next.js 14 (App Router, Static Export)
- **Styling**: Tailwind CSS + shadcn/ui
- **Theme**: next-themes (Dark/Light mode)
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages
- **API**: Cloudflare Functions (Edge Runtime)
- **Package Manager**: npm

---

**Repository**: https://github.com/hiromps/cloudflare-hellopage
**Last Updated**: 2025-01-02

Happy coding! 🚀
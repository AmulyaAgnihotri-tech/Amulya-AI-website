# AmulyaAI - Next.js SaaS Platform

Enterprise-grade AI chat application with ChatGPT-level intelligence, built with Next.js, TypeScript, React, and TailwindCSS.

## 🚀 Features

- **Advanced AI Chat** - Integration with Pollinations.ai or OpenAI API
- **Real-time Conversations** - Instant message delivery using WebSockets
- **User Authentication** - Secure auth with Supabase
- **Subscription Management** - Stripe integration for billing
- **Beautiful UI** - Dark theme with glassmorphism and smooth animations
- **Responsive Design** - Works perfectly on all devices
- **Analytics Dashboard** - Track usage and performance metrics
- **API-First Architecture** - RESTful API for third-party integrations

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: TailwindCSS 3 with custom themes
- **Animations**: Framer Motion
- **Components**: shadcn/ui, Radix UI, Lucide Icons
- **HTTP Client**: Axios

### Backend
- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Pollinations.ai / OpenAI API
- **Payments**: Stripe
- **Storage**: Supabase Storage

### DevOps
- **Deployment**: Vercel (Frontend) + Supabase (Backend)
- **Package Manager**: npm
- **Version Control**: Git

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Supabase account
- Stripe account (for payments)
- OpenAI/Pollinations.ai API key

## 🏗️ Project Structure

```
amulya-ai/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx        # Home page
│   │   ├── layout.tsx      # Root layout
│   │   ├── chat/
│   │   │   ├── page.tsx    # Chat interface
│   │   │   └── layout.tsx  # Chat layout
│   │   └── api/            # API routes
│   │       ├── chat/       # Chat endpoint
│   │       ├── conversations/  # Conversations management
│   │       └── auth/       # Authentication routes
│   ├── components/          # React components
│   │   ├── Hero.tsx        # Landing hero section
│   │   ├── Features.tsx    # Features showcase
│   │   ├── Pricing.tsx     # Pricing cards
│   │   ├── ChatWindow.tsx  # Chat display area
│   │   ├── ChatInput.tsx   # Message input
│   │   ├── Sidebar.tsx     # Conversation sidebar
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── Footer.tsx      # Footer
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # Helper functions
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Type definitions
│   └── styles/             # Global styles
│       └── globals.css     # TailwindCSS imports
├── public/                 # Static assets
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # TailwindCSS config
├── next.config.js          # Next.js config
└── README.md               # This file
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pk
STRIPE_SECRET_KEY=your_stripe_sk

# AI API
OPENAI_API_KEY=your_openai_key
# or for Pollinations.ai, no key needed (open API)

# Other
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📚 API Routes

### Chat Endpoint
- **POST** `/api/chat` - Send a message and get AI response

### Conversations
- **GET** `/api/conversations` - Get all user conversations
- **POST** `/api/conversations` - Create new conversation

### Authentication
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/signup` - User registration
- **POST** `/api/auth/logout` - User logout

## 🎨 Customization

### Theme
Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: '#ff1a1a',      // Main red accent
  secondary: '#a855f7',    // Purple accent
  accent: '#06b6d4',       // Cyan accent
}
```

### Components
All UI components are in `src/components/`. Edit them to match your brand.

## 🔌 Integration Guide

### Supabase Setup
1. Create a new project on [supabase.com](https://supabase.com)
2. Create tables for users, conversations, messages
3. Set up Row Level Security (RLS) policies
4. Copy URL and API key to `.env.local`

### Stripe Setup
1. Create account on [stripe.com](https://stripe.com)
2. Set up products and pricing plans
3. Copy publishable and secret keys to environment

### OpenAI Integration
1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Implement streaming in `/api/chat` route
3. Handle rate limiting and errors

## 📦 Available Scripts

```bash
# Development
npm run dev           # Start dev server
npm run type-check   # Check TypeScript types

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Type checking
```

## 🔒 Security

- All sensitive keys stored in `.env.local` (never committed)
- API routes validate user authentication
- Stripe webhook signature verification
- SQL injection prevention via Supabase ORM
- CORS headers configured properly

## 📈 Performance

- **Code Splitting**: Route-based automatic code splitting
- **Image Optimization**: Next.js Image component
- **Edge Caching**: Vercel edge network
- **Database Indexes**: Optimized queries
- **Compression**: Gzip compression enabled

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically on push

```bash
git push origin main
```

### Manual Deployment

```bash
npm run build
npm start
```

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@amulya-ai.com
- Discord: [Join our community](#)

## 📄 License

MIT License - see LICENSE.md for details

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [TailwindCSS](https://tailwindcss.com)
- Animations by [Framer Motion](https://framer.com/motion)
- UI Components from [shadcn/ui](https://ui.shadcn.com)

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintainer**: AmulyaAI Team

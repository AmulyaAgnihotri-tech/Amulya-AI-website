# 🚀 AmulyaAI - Setup & Installation Guide

## Quick Start (5 minutes)

### Step 1: Install Node.js

AmulyaAI requires Node.js 18 or higher. 

**Windows/Mac/Linux:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download **LTS version (18.x or 20.x)**
3. Run installer and follow prompts
4. Verify installation:
   ```bash
   node --version    # Should show v18.x.x or higher
   npm --version     # Should show 9.x.x or higher
   ```

### Step 2: Install Dependencies

```bash
cd "E:\VS Code\Amulya AI website"
npm install
```

This installs all required packages (React, Next.js, TailwindCSS, etc.)

### Step 3: Create `.env.local`

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with:
- Supabase URL and API key
- Stripe API keys (optional)
- OpenAI or Pollinations.ai API key

### Step 4: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## 📋 Installation Checklist

- [ ] Node.js 18+ installed
- [ ] npm install completed
- [ ] `.env.local` created with API keys
- [ ] Development server running (`npm run dev`)
- [ ] Application loads at localhost:3000
- [ ] Chat page accessible at localhost:3000/chat

## 🔧 Configuration Steps

### 1. Supabase Setup (Database & Auth)

**Create Supabase Project:**
1. Go to [supabase.io](https://supabase.io)
2. Click "New Project"
3. Fill in project details
4. Copy URL and API key to `.env.local`

**Create Database Tables:**

Run these SQL queries in Supabase console:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50),
  avatar_url TEXT,
  subscription_tier VARCHAR(20) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255),
  status VARCHAR(50),
  plan VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

### 2. Stripe Setup (Payments)

1. Create account at [stripe.com](https://stripe.com)
2. Go to Developers → API Keys
3. Copy Publishable and Secret keys to `.env.local`
4. Create webhook endpoint:
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `customer.subscription.updated`

### 3. OpenAI Setup (AI Responses)

1. Create account at [platform.openai.com](https://platform.openai.com)
2. Generate API key
3. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk_your_key_here
   ```

**Or use Pollinations.ai (open API, no key needed)**

## 📁 Project Structure Overview

```
amulya-ai/
├── src/
│   ├── app/              # Pages and layouts
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   ├── types/            # TypeScript types
│   └── styles/           # CSS files
├── public/               # Static files
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # TailwindCSS config
└── README.md             # Full documentation
```

## 🎯 Development Workflow

### Running the Development Server
```bash
npm run dev
# Access at http://localhost:3000
```

### Type Checking
```bash
npm run type-check
# Checks TypeScript for errors
```

### Linting Code
```bash
npm run lint
# ESLint checks code quality
```

### Building for Production
```bash
npm run build
npm start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect GitHub repository
4. Add environment variables (same as `.env.local`)
5. Deploy!

```bash
git push origin main  # Automatically deploys
```

### Deploy to Other Platforms

**Using Docker:**
```bash
npm run build
docker build -t amulya-ai .
docker run -p 3000:3000 amulya-ai
```

**Using PM2:**
```bash
npm run build
pm2 start npm --name "amulya-ai" -- start
```

## 🔗 Important Links

- **Next.js Docs**: https://nextjs.org/docs
- **TailwindCSS**: https://tailwindcss.com
- **Supabase**: https://supabase.io/docs
- **Stripe Docs**: https://stripe.com/docs
- **OpenAI API**: https://platform.openai.com/docs

## ❓ Troubleshooting

### Node not found?
```bash
# Reinstall Node.js from nodejs.org
# Then verify:
node --version
npm --version
```

### npm install fails?
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Reinstall
npm install
```

### Port 3000 already in use?
```bash
# Run on different port
npm run dev -- -p 3001
```

### API keys not working?
- Verify `.env.local` file exists
- Check for typos in API keys
- Make sure API keys are enabled on their respective platforms
- Restart dev server after changing `.env.local`

## 📚 File Descriptions

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | TailwindCSS theme customization |
| `next.config.js` | Next.js configuration |
| `src/app/page.tsx` | Home page |
| `src/app/chat/page.tsx` | Chat interface |
| `src/components/` | Reusable React components |
| `.env.example` | Environment variable template |

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#ff1a1a',      // Red (change to your brand)
  secondary: '#a855f7',    // Purple
  accent: '#06b6d4',       // Cyan
}
```

### Modify Logo/Branding
- Edit `Navbar.tsx` to change logo text
- Replace images in `public/` folder
- Update metadata in `src/app/layout.tsx`

## 📞 Getting Help

- Check README.md for full documentation
- Review code comments in component files
- Check Next.js and component library docs
- Open issue on GitHub

---

**Congratulations! Your AmulyaAI development environment is ready.** 🎉

Next steps:
1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Set up `.env.local`
4. ✅ Run `npm run dev`
5. ✅ Start building!

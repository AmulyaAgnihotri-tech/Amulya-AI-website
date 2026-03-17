# Quick Start Guide - AmulyaAI

## ⚡ 5-Minute Setup

### 1️⃣ **Install Node.js**
- Go to [nodejs.org](https://nodejs.org)
- Download **LTS version** (18.x or 20.x)
- Install and verify: `node --version` && `npm --version`

### 2️⃣ **Run Installation Script**

**Windows:**
```bash
install.bat
```

**macOS/Linux:**
```bash
chmod +x install.sh
./install.sh
```

**Or manually:**
```bash
npm install
```

### 3️⃣ **Setup Environment**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
- `NEXT_PUBLIC_SUPABASE_URL` (from supabase.io)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from supabase.io)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (from stripe.com)
- `STRIPE_SECRET_KEY` (from stripe.com)
- `OPENAI_API_KEY` (from platform.openai.com)

### 4️⃣ **Start Development Server**
```bash
npm run dev
```

### 5️⃣ **Visit the App**
Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📚 Detailed Guides

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete installation & configuration
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deploy to production
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design & integration
- **[README.md](./README.md)** - Full documentation

---

## 🎯 What You Get

✅ ChatGPT-like interface  
✅ Dark theme with glassmorphism  
✅ User authentication ready  
✅ Payment integration ready  
✅ AI API integration ready  
✅ Production-ready code  

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Node not found | Install from nodejs.org |
| npm install fails | Run `npm cache clean --force` |
| Port 3000 in use | Use `npm run dev -- -p 3001` |
| Build errors | Check `.env.local` has valid keys |

---

## 📞 Need Help?

1. Check the detailed guides above
2. Review [Next.js docs](https://nextjs.org/docs)
3. Check your API credentials

---

**🎉 Ready to build? Start with Step 1 above!**

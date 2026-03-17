# AmulyaAI - Deployment Guide

## Overview

This guide covers deploying AmulyaAI to production using Vercel and Supabase.

## Architecture

```
┌─────────────────┐
│   Vercel CDN    │
│  (Frontend)     │
└────────┬────────┘
         │
┌────────▼────────────┐
│  Next.js API Routes │
│  (Server-Side)      │
└────────┬────────────┘
         │
    ┌────┴──────────┬─────────────┐
    │               │             │
┌───▼────┐  ┌──────▼──────┐  ┌──▼─────┐
│Supabase│  │Stripe API   │  │OpenAI  │
│(DB)    │  │(Payments)   │  │(AI)    │
└────────┘  └─────────────┘  └────────┘
```

## Prerequisites for Deployment

- [ ] GitHub account with repository
- [ ] Vercel account
- [ ] Supabase project created
- [ ] Stripe account configured
- [ ] OpenAI/Pollinations.ai API key
- [ ] Custom domain (optional)

## Step-by-Step Deployment

### 1. Prepare Code for Production

```bash
# Ensure all code is committed
git add .
git commit -m "Prepare for production deployment"

# Run production build locally to test
npm run build
npm start
# Test at http://localhost:3000
```

### 2. Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/yourusername/amulya-ai.git
git push -u origin main
```

### 3. Deploy to Vercel

**Via Web UI (Recommended):**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"
5. In "Environment Variables" section, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = (from Supabase)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (from Supabase)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = (from Stripe)
   STRIPE_SECRET_KEY = (from Stripe)
   OPENAI_API_KEY = (from OpenAI, if using)
   ```
6. Click "Deploy"

**Via CLI:**

```bash
npm i -g vercel
vercel login
vercel
```

### 4. Configure Supabase for Production

**Add Production Database:**

```bash
# Create new Supabase project for production
# (Don't use staging database with real users)
```

**Update Environment Variables:**

In Supabase project settings:
1. Go to Settings → API
2. Copy production URL and keys
3. Update Vercel environment variables

**Configure Row Level Security (RLS):**

```sql
-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own conversations
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (user_id = auth.uid());

-- Similar policies for messages...
```

### 5. Configure Stripe Webhooks

1. Go to Stripe Dashboard
2. Developers → Webhooks
3. Add endpoint: `https://yourdomain.vercel.app/api/webhooks/stripe`
4. Select events:
   - `payment_intent.succeeded`
   - `customer.subscription.updated`
   - `invoice.payment_failed`
5. Copy webhook secret to Vercel environment:
   ```
   STRIPE_WEBHOOK_SECRET = whsec_xxxxx
   ```

### 6. Set Custom Domain (Optional)

In Vercel Dashboard:
1. Select project
2. Settings → Domains
3. Add your domain
4. Update DNS records as instructed
5. Wait for DNS propagation (5-48 hours)

## Environment Variables Checklist

Create this in Vercel Environment Variables:

```
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
✅ STRIPE_SECRET_KEY
✅ STRIPE_WEBHOOK_SECRET
✅ OPENAI_API_KEY (if using OpenAI)
✅ NEXT_PUBLIC_APP_URL (production domain)
```

## Monitoring & Maintenance

### Monitor Application Health

**Vercel Analytics:**
- Go to Project → Analytics
- Monitor response times, errors, usage

**Supabase Monitoring:**
- Go to Database → Monitoring
- Check database performance and logs

**Error Tracking:**
- Set up Sentry or similar for error monitoring
- Add to your API routes

### Database Backups

**Supabase Automatic Backups:**
- Supabase automatically backs up daily
- Access via Backups tab in Supabase dashboard

**Manual Backups:**
```bash
# Export Supabase data
pg_dump postgresql://user:password@host/database > backup.sql
```

### Performance Optimization

1. **Enable Caching:**
   ```typescript
   // In API routes
   response.setHeader('Cache-Control', 'max-age=60')
   ```

2. **Database Indexes:**
   ```sql
   CREATE INDEX conversations_user_id_idx ON conversations(user_id);
   CREATE INDEX messages_conversation_id_idx ON messages(conversation_id);
   ```

3. **Image Optimization:**
   - Use Next.js Image component
   - Optimize images before uploading

4. **Code Splitting:**
   - Next.js automatically code-splits
   - Monitor bundle size with `npm run build`

## Scaling Considerations

### When to Scale

- **Database**: When queries exceed 1000 req/sec
- **Backend**: When CPU/memory usage > 80%
- **Storage**: When storage exceeds 90% of plan

### Scaling Options

1. **Supabase Scaling:**
   - Upgrade to higher compute tier
   - Enable connection pooling
   - Add read replicas

2. **Vercel Scaling:**
   - Automatically scales with usage
   - Configure edge middleware for optimization

3. **Cache Layer:**
   - Add Redis with Upstash
   - Cache frequently accessed data

## CI/CD Pipeline

**Automatic Deployments:**

Vercel automatically deploys on:
- Push to main branch
- Pull request created (preview deployment)
- Manual redeployment

**Preview Deployments:**

Each PR gets preview URL:
- Test before merging
- Share with team for review

## Security Best Practices

### Before Going Live

- [ ] Review `.env.local.example` - ensure no secrets exposed
- [ ] Verify `.gitignore` includes `.env.local`
- [ ] Enable CORS on Supabase (only allow your domain)
- [ ] Configure Stripe webhook verification
- [ ] Set strong database passwords
- [ ] Enable 2FA on all accounts
- [ ] Review API rate limiting
- [ ] Test payment flow in test mode first

### Ongoing Security

- Rotate API keys monthly
- Monitor Supabase audit logs
- Review Stripe transaction logs
- Keep dependencies updated
- Enable HTTPS only (automatic with Vercel)
- Regular security audits

### HTTPS/SSL

- Automatically configured by Vercel
- Custom domains get free SSL certificate
- No additional setup needed

## Rollback Procedures

**If Deployment Fails:**

1. Go to Vercel Dashboard
2. Select Project → Deployments
3. Click on previous successful deployment
4. Click "..." → Promote to Production

**If Database Migration Fails:**

1. Supabase → Database → Backups
2. Restore to previous version
3. Re-run migrations

## Cost Estimation

| Service | Free Tier | Production | Cost |
|---------|----------|------------|------|
| Vercel | ✅ | Limited | $20-200/mo |
| Supabase | ✅ Limited | Standard | $25-100/mo |
| Stripe | ✅ | Yes | 2.9% + $0.30/tx |
| OpenAI | ✅ Limited | Usage | $5-100/mo |
| **Total** | **Free** | **Production** | **~$100-400/mo** |

## Troubleshooting

### Build Fails on Vercel
```bash
# Clear build cache
vercel env pull
npm run build
```

### API Calls Failing
- Check API keys in env variables
- Verify CORS configuration
- Check Vercel function logs

### Database Connection Issues
- Verify Supabase credentials
- Check connection pooling settings
- Review Supabase status page

## Post-Deployment Checklist

- [ ] Application loads in browser
- [ ] Home page displays correctly
- [ ] Chat page accessible (auth may be needed)
- [ ] API responses successful (check Network tab)
- [ ] Emails sending correctly (test signup)
- [ ] Payments processing (test with 4242424242424242)
- [ ] Analytics tracking events
- [ ] Error logging working
- [ ] Database backups running
- [ ] Monitor performance for 24 hours

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.io/docs
- Stripe Docs: https://stripe.com/docs
- Next.js Docs: https://nextjs.org/docs

---

🎉 **Congratulations! Your AmulyaAI is now live in production!**

Keep monitoring and optimizing for the best user experience.

# Architecture & Integration Guide

## System Architecture

### Frontend Layer
- **Next.js 14** with App Router and TypeScript
- **React 18** for UI components
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Hosted on Vercel** with automatic deployments

### Backend/API Layer
- **Next.js API Routes** for REST endpoints
- **Node.js runtime** on Vercel serverless functions
- **Supabase Edge Functions** for custom logic

### Database Layer
- **Supabase PostgreSQL** for data storage
- **Real-time subscriptions** for live updates
- **Row Level Security (RLS)** for data protection

### Authentication
- **Supabase Auth** for user management
- **JWT tokens** for API authentication
- **Session-based auth** for web routes

### AI/NLP Integration
- **OpenAI GPT-4** or **Pollinations.ai** for AI responses
- **Streaming responses** for real-time text generation
- **Conversation memory** stored in database

### Payment Processing
- **Stripe** for payment handling
- **Webhook verification** for security
- **Subscription management** in database

## Integration Points

### 1. Frontend ↔ Backend
```
Next.js Pages → API Routes (/api/*)
     ↓            ↓
React Components  Node.js handlers
     ↓            ↓
TypeScript Types  Middleware
```

### 2. Backend ↔ Database
```
API Routes → Supabase Client
     ↓
PostgreSQL Tables
     ↓
RLS Policies
```

### 3. Backend ↔ AI
```
/api/chat → OpenAI/Pollinations.ai API
     ↓
Streaming Response
     ↓
Save to database
```

### 4. Backend ↔ Payments
```
/api/billing → Stripe API
     ↓
Webhooks ← Stripe Events
     ↓
Update Subscriptions
```

## Data Flow

### Chat Message Flow
```
User Types Message
     ↓
ChatInput Component captures text
     ↓
POST /api/chat with conversationId
     ↓
API saves user message to database
     ↓
Call AI API (OpenAI/Pollinations.ai)
     ↓
Stream response back to frontend
     ↓
Save AI response to database
     ↓
ChatWindow displays message
```

### Authentication Flow
```
User enters email/password
     ↓
POST /api/auth/login
     ↓
Supabase verifies credentials
     ↓
Returns JWT token
     ↓
Save token in session/cookies
     ↓
Frontend redirects to /chat
```

### Subscription Flow
```
User clicks "Subscribe"
     ↓
Redirects to Stripe checkout
     ↓
User completes payment
     ↓
Stripe sends webhook to /api/webhooks/stripe
     ↓
Update subscription in database
     ↓
User gains access to Pro features
```

## Key Features Implementation

### Real-time Chat (Future Enhancement)
```typescript
// Use Supabase Realtime Subscriptions
const subscription = supabase
  .from(`messages:conversation_id=eq.${conversationId}`)
  .on('INSERT', (payload) => {
    addMessage(payload.new)
  })
  .subscribe()
```

### Streaming AI Responses (Future Enhancement)
```typescript
// Use fetch with ReadableStream
const response = await fetch('/api/chat', { 
  method: 'POST', 
  body: JSON.stringify({ message })
})

const reader = response.body?.getReader()
while (true) {
  const { done, value } = await reader?.read()
  if (done) break
  // Process streaming chunks
}
```

### Voice Input (With Python Backend)
```python
# Use amulya_ai_complete.py
listen_for_command()  # Speech to text
ai_ask_stream()       # Get AI response
speak()               # Text to speech
```

## External API Dependencies

| API | Usage | Rate Limit | Cost |
|-----|-------|-----------|------|
| Supabase | DB, Auth, Storage | 2500 req/min | Free-$100/mo |
| Stripe | Payments | 100 req/sec | 2.9% + $0.30 |
| OpenAI | AI responses | 90k tokens/min | $0.03-0.06/1K |
| Pollinations.ai | AI responses | 1000 req/hr | Free |

## Security Implementation

### API Route Protection
```typescript
// Verify user is authenticated
const { data: { user }, error } = await supabase.auth.getUser()
if (error || !user) return new Response('Unauthorized', { status: 401 })
```

### Database Row Security
```sql
-- Only users can see their own conversations
CREATE POLICY "Own conversations" ON conversations
  FOR SELECT USING (auth.uid() = user_id)
```

### Webhook Verification
```typescript
// Verify Stripe webhook signature
const sig = req.headers['stripe-signature']
const event = stripe.webhooks.constructEvent(body, sig, secret)
```

### Environment Variables
- Never expose in client code (use NEXT_PUBLIC_ prefix cautiously)
- Encrypt sensitive data in database
- Rotate API keys regularly

## Deployment Architecture

```
GitHub Repository
     ↓
Push to main branch
     ↓
Vercel detects changes
     ↓
Builds Next.js app
     ↓
Runs tests (if configured)
     ↓
Deploys to Vercel edge network
     ↓
Update production domain
     ↓
Invalidate Supabase cache
```

## Monitoring & Observability

### Frontend Monitoring
- Vercel Analytics (performance metrics)
- Browser console errors
- User session tracking

### Backend Monitoring
- API response times
- Database query performance
- Error logging (Sentry/DataDog)

### Payment Monitoring
- Stripe transaction logs
- Webhook verification
- Revenue tracking

## Future Enhancements

### Planned Features
1. Real-time chat with WebSockets
2. Voice input/output support
3. Image generation integration
4. Custom model fine-tuning
5. Multi-language support
6. Analytics dashboard
7. Team collaboration
8. API access for developers

### Integration Opportunities
1. Slack bot integration
2. Discord bot integration
3. Mobile app (React Native)
4. Browser extension
5. VSCode plugin

## Troubleshooting Guide

### Database Connection Issues
- Verify Supabase credentials
- Check IP whitelist (if applicable)
- Monitor database connection pool

### API Rate Limiting
- Implement request queuing
- Add caching layer
- Distribute load across regions

### AI Response Latency
- Switch to faster model (GPT-3.5-turbo)
- Use Pollinations.ai for speed
- Implement response streaming

### Payment Processing Errors
- Verify Stripe test keys in dev
- Check webhook endpoint connectivity
- Review Stripe dashboard for errors

---

For implementation details, see:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Installation instructions
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Production deployment
- [README.md](./README.md) - Feature overview


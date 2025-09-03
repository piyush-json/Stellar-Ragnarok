# Supabase Setup Guide for StarLance

## 🚀 Quick Start

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose organization and enter project details
5. Wait for database to be ready (2-3 minutes)

### 2. Get Your Credentials
- Go to Settings → API
- Copy your:
  - Project URL
  - Anon Public Key
  - Service Role Key (keep secret!)

### 3. Run Database Schema
1. Go to SQL Editor in Supabase Dashboard
2. Copy and paste the contents of `schema.sql`
3. Click "Run" to execute

### 4. Environment Variables
Create `.env.local` file:
```env
VITE_SUPABASE_URL=https://gvlkmpmeppveurzzuwao.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bGttcG1lcHB2ZXVyenp1d2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NjA0MDcsImV4cCI6MjA3MDMzNjQwN30.Yow69F79SRMUXFXUvPWuFbW_DfVqIgKLfznVf_BuM8w
```

## 📊 Database Tables Created

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `profiles` | User accounts | Role-based (freelancer/client) |
| `gigs` | Job listings | Categories, pricing, delivery time |
| `chats` | Messaging system | Real-time, JSONB messages |
| `transactions` | Payments | XLM currency, escrow system |
| `ratings` | Reviews | 5-star system with categories |
| `applications` | Job proposals | Freelancer applications |
| `disputes` | Conflict resolution | Admin mediation system |

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Authentication** via Supabase Auth
- **Real-time subscriptions** for chat
- **File storage** for attachments
- **Encrypted connections** by default

## 🛠️ Next Steps

1. **Install Supabase Client**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Supabase Client** (see `src/lib/supabase.js`)

3. **Implement Authentication** in your React components

4. **Set up Real-time Chat** using Supabase subscriptions

5. **Configure Storage** for file uploads

## 📱 Integration Points

- **React Components** → Supabase Client
- **Authentication** → Supabase Auth
- **Real-time Chat** → Supabase Realtime
- **File Storage** → Supabase Storage
- **Database** → Supabase PostgreSQL

## 🔍 Testing Your Setup

1. Check if tables are created in Table Editor
2. Verify RLS policies are active
3. Test authentication flow
4. Verify real-time subscriptions work
5. Test file uploads to storage

## 🚨 Important Notes

- Keep your service role key secret
- Test RLS policies thoroughly
- Monitor database performance
- Set up proper backup strategies
- Configure CORS settings if needed

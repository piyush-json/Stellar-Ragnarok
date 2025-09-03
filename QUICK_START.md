# 🚀 StarLance Quick Start Guide

## ⚡ Get Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project named "starlance"
3. Copy your project URL and anon key from Settings → API

### 3. Configure Environment
1. Copy `env.example` to `.env.local`
2. Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Database
1. In Supabase Dashboard → SQL Editor
2. Copy contents of `database/schema.sql`
3. Click "Run" to create all tables

### 5. Start Development Server
```bash
npm run dev
```

### 6. Open Your App
Navigate to `http://localhost:4028/`

## 🎯 What You'll See

- ✅ **Landing Page** - Welcome to StarLance
- ✅ **Job Marketplace** - Browse available gigs
- ✅ **Chat Interface** - Real-time messaging
- ✅ **User Dashboards** - Freelancer & Client views
- ✅ **Authentication** - Sign up/sign in system

## 🔧 Troubleshooting

### Common Issues:
- **CSS errors**: Fixed with PostCSS config update
- **Dependency conflicts**: Use `--legacy-peer-deps` flag
- **Database connection**: Check environment variables
- **Port conflicts**: Change port in `vite.config.mjs`

### Need Help?
- Check `database/IMPLEMENTATION_SUMMARY.md`
- Review `database/supabase-setup.md`
- Verify Supabase project is active
- Check browser console for errors

## 🚀 Next Steps

1. **Test the application** - navigate between pages
2. **Create a user account** - test authentication
3. **Post a job** - test gig creation
4. **Send messages** - test real-time chat
5. **Customize the UI** - modify components as needed

## 📱 Features Ready to Use

- 🔐 **User Authentication** (Sign up, Sign in, Profile)
- 💼 **Job Marketplace** (Browse, Filter, Search)
- 💬 **Real-time Chat** (Instant messaging)
- 📊 **User Dashboards** (Freelancer & Client views)
- ⭐ **Rating System** (Reviews & feedback)
- 💰 **Payment System** (XLM transactions)
- 🛡️ **Security** (RLS, Authentication, Validation)

Your StarLance application is now fully functional with a complete backend! 🎉

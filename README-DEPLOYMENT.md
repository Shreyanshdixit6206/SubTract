# SubTract - Subscription Management App

> **Subtract the unnecessary, Add the valuable**

A premium subscription management and financial wellness app built for Indian users with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

![SubTract Preview](https://img.shields.io/badge/Status-Production_Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

---

## 🌟 Features

### Core Features
- ✅ **Subscription Management** - Track all your subscriptions in one place
- ✅ **Smart Insights** - AI-powered recommendations and analytics
- ✅ **Savings Mandir** - Celebrate money saved from cancelled subscriptions
- ✅ **Budget Tracking** - Stay within your monthly subscription budget
- ✅ **Payment Reminders** - Never miss a subscription payment
- ✅ **Category Analytics** - Detailed breakdowns by subscription type

### Technical Features
- 🎨 **Glassmorphism UI** - Modern, premium design with blur effects
- 🎭 **Smooth Animations** - 60fps animations with Framer Motion
- 📱 **Mobile First** - Fully responsive from 320px to 4K
- 🌙 **Dark Mode** - Beautiful dark theme (light mode ready)
- ⚡ **Performance** - Optimized for 90+ Lighthouse scores
- 🔐 **Authentication** - JWT-based auth with localStorage
- 🎯 **TypeScript** - Full type safety throughout

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/subtract.git
cd subtract

# Install dependencies (use package-next.json)
cp package-next.json package.json
npm install

# Set up environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` and login with:
- **Email:** user@subtract.com
- **Password:** password123

---

## 📦 Project Structure

```
subtract/
├── src/
│   ├── pages/              # Next.js pages & API routes
│   │   ├── api/           # Serverless backend
│   │   │   ├── auth/      # Authentication endpoints
│   │   │   ├── subscriptions/ # Subscription CRUD
│   │   │   └── user/      # User profile & stats
│   │   ├── _app.tsx       # App with providers
│   │   ├── _document.tsx  # HTML document
│   │   ├── index.tsx      # Landing/Login page
│   │   └── dashboard.tsx  # Main dashboard
│   │
│   ├── components/         # React components
│   │   ├── auth/          # Login, Signup, etc.
│   │   ├── ui/            # Reusable UI components
│   │   ├── Dashboard.tsx
│   │   ├── Insights.tsx
│   │   ├── SavingsMandir.tsx
│   │   └── Navigation.tsx
│   │
│   ├── context/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── SubscriptionContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useSubscriptions.ts
│   │   ├── useToast.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── types/              # TypeScript definitions
│   │   ├── subscription.ts
│   │   ├── user.ts
│   │   └── api.ts
│   │
│   ├── utils/              # Utility functions
│   │   ├── dummyData.ts   # Mock data
│   │   ├── formatters.ts  # Indian number/date formatting
│   │   ├── calculations.ts # Spending calculations
│   │   └── constants.ts   # App constants
│   │
│   └── styles/             # Global styles
│       └── globals.css    # Tailwind + custom styles
│
├── public/                 # Static assets
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies

```

---

## 🎨 Design System

### Colors
```css
Primary Purple: #8B5CF6
Secondary Cyan: #06B6D4
Accent Orange: #F97316
Success Green: #10B981
Warning Amber: #F59E0B
Error Red: #EF4444
Background Dark: #0f0f1e
```

### Typography
- **Font Family:** Plus Jakarta Sans, Inter
- **Monospace:** JetBrains Mono

### Animations
- **Page Transitions:** 300ms slide/fade
- **List Stagger:** 80ms delay between items
- **Button Press:** 100ms scale down
- **Card Hover:** 300ms float up

---

## 🔧 Tech Stack

### Frontend
- **Framework:** Next.js 14.2
- **Language:** TypeScript 5.3
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 11.0
- **Icons:** Lucide React
- **Charts:** Recharts
- **UI Components:** Radix UI
- **Toast Notifications:** React Hot Toast

### Backend
- **API:** Next.js API Routes (Serverless)
- **Data Storage:** LocalStorage (dummy data)
- **Authentication:** JWT (dummy implementation)

### Deployment
- **Platform:** Vercel
- **CI/CD:** Automatic on git push
- **Region:** Singapore (sin1)

---

## 🚢 Deployment to Vercel

### Method 1: Automatic (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/subtract.git
git push -u origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Environment Variables** (in Vercel dashboard)
   - `NEXT_PUBLIC_APP_URL`: Your production URL
   - `NEXT_PUBLIC_APP_NAME`: SubTract

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## 🎯 API Endpoints

### Authentication
```
POST /api/auth/login       # Login with email/password
POST /api/auth/logout      # Logout user
POST /api/auth/register    # Register new user
```

### Subscriptions
```
GET    /api/subscriptions        # Get all subscriptions
POST   /api/subscriptions/create # Create new subscription
GET    /api/subscriptions/[id]   # Get subscription by ID
PUT    /api/subscriptions/[id]   # Update subscription
DELETE /api/subscriptions/[id]   # Cancel subscription
```

### User
```
GET /api/user/profile  # Get user profile
PUT /api/user/profile  # Update user profile
GET /api/user/stats    # Get subscription statistics
```

---

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 767px (single column, bottom nav)
- **Tablet:** 768px - 1023px (2 columns, toggle sidebar)
- **Desktop:** 1024px+ (3 columns, permanent sidebar)

---

## 🎭 Animation Guidelines

All animations follow these principles:
- **Duration:** 150ms (fast), 300ms (normal), 500ms (slow)
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` or spring physics
- **Performance:** GPU-accelerated (transform, opacity)
- **Accessibility:** Respects `prefers-reduced-motion`

---

## 🔐 Default Login Credentials

For testing/demo purposes:

**Email:** user@subtract.com  
**Password:** password123

> **Note:** This is a dummy authentication system. In production, implement proper security measures.

---

## 📊 Dummy Data

The app comes pre-loaded with:
- 12 active subscriptions (Netflix, Spotify, Amazon Prime, etc.)
- 6 cancelled subscriptions
- Realistic Indian subscription platforms
- UPI/Card payment methods
- Monthly/Yearly billing cycles

Edit `src/utils/dummyData.ts` to customize.

---

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.js`:
```js
colors: {
  primary: { /* Your colors */ },
  secondary: { /* Your colors */ },
  accent: { /* Your colors */ }
}
```

### Add New Subscription Platforms
Edit `src/utils/dummyData.ts`:
```ts
export const DUMMY_SUBSCRIPTIONS = [
  {
    id: 'new-id',
    name: 'Your Platform',
    logo: '🆕',
    category: 'Entertainment',
    amount: 299,
    // ... other fields
  }
];
```

### Modify Animations
Edit animation durations in `src/utils/constants.ts`:
```ts
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};
```

---

## 🐛 Troubleshooting

### Build Errors

**Error:** `Module not found: Can't resolve '@/...'`  
**Fix:** Check `tsconfig.json` paths are correctly configured

**Error:** `window is not defined`  
**Fix:** Use `typeof window !== 'undefined'` checks or Next.js dynamic imports

**Error:** Hydration mismatch  
**Fix:** Use `useEffect` for client-only code, avoid random IDs

### Vercel Deployment Issues

**Error:** Build fails on Vercel  
**Fix:** Ensure `package-next.json` is renamed to `package.json` before deploying

**Error:** Environment variables not working  
**Fix:** Add variables in Vercel dashboard, they override `.env.local`

---

## 📈 Performance Optimization

The app implements:
- ✅ React.memo for expensive components
- ✅ useMemo for calculations
- ✅ useCallback for event handlers
- ✅ Lazy loading with React.lazy
- ✅ Image optimization with Next/Image
- ✅ Code splitting by route
- ✅ Debounced search inputs
- ✅ Skeleton screens for loading

---

## 🎯 Lighthouse Scores (Target)

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🤝 Contributing

This is a proprietary project. For contributions:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

All Rights Reserved © 2025 SubTract

---

## 📞 Support

For issues or questions:
- **GitHub Issues:** [github.com/yourusername/subtract/issues](https://github.com/yourusername/subtract/issues)
- **Email:** support@subtract.app
- **Docs:** [docs.subtract.app](https://docs.subtract.app)

---

## 🎉 Acknowledgments

- **Design Inspiration:** Modern FinTech apps
- **UI Components:** Radix UI, shadcn/ui
- **Icons:** Lucide Icons
- **Fonts:** Google Fonts

---

## 🗺️ Roadmap

### Phase 1 ✅ (Current)
- [x] Authentication flow
- [x] Dashboard with subscriptions
- [x] Add/Edit/Delete subscriptions
- [x] Savings Mandir
- [x] Insights & Analytics
- [x] Responsive design
- [x] Vercel deployment

### Phase 2 (Future)
- [ ] Real database integration (Supabase/Firebase)
- [ ] Email notifications
- [ ] CSV export
- [ ] Family sharing
- [ ] Bill splitting
- [ ] Browser extension
- [ ] Mobile apps (React Native)

---

Made with 💜 in India | Powered by Next.js & Vercel

# SubTract - Deployment Guide

## ✅ Production Build Status
**Build successful!** All TypeScript errors resolved and production build completed.

## 🚀 Deploy to Vercel

### Quick Deploy (Recommended)
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from project root:
   ```bash
   vercel
   ```

3. Follow prompts:
   - Link to existing project or create new
   - Set project name: `subtract`
   - Keep default settings

4. Production deployment:
   ```bash
   vercel --prod
   ```

### Deploy via GitHub (Alternative)
1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js config
6. Click "Deploy"

## 📋 Pre-Deployment Checklist
- ✅ Production build passes (`npm run build`)
- ✅ All TypeScript errors resolved
- ✅ `vercel.json` configured for Mumbai region (bom1)
- ✅ Environment variables set
- ✅ next.config.js optimized for production
- ✅ Platform icons configured with Clearbit fallbacks
- ✅ Unused Vite files disabled

## 🔧 Environment Variables
Set these in Vercel dashboard (optional):
```
NEXT_PUBLIC_APP_NAME=SubTract
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 🌍 Regional Configuration
Currently configured for **Mumbai (bom1)** region in `vercel.json` for optimal Indian user performance.

## 📦 Build Output
- Framework: Next.js 14.2.33
- Output: `.next` directory
- Static pages: 15 routes generated
- Build size optimized with SWC minification

## 🎨 Features Deployed
- Server-side rendering (SSR)
- Static generation for landing pages
- Dynamic imports for code splitting
- Image optimization via Next.js
- Platform logo integration (Clearbit API)
- Dark/Light theme support
- Responsive design (mobile-first)

## 🔍 Post-Deployment Testing
After deployment, verify:
1. Landing page loads (`/`)
2. Authentication flow (`/login`, `/signup`)
3. Dashboard functionality (`/dashboard`)
4. Platform icons render correctly
5. Theme toggle works
6. Mobile responsiveness

## 📝 Deployment Commands Reference
```bash
# Development
npm run dev

# Production build (local test)
npm run build
npm start

# Deploy to Vercel
vercel          # Preview deployment
vercel --prod   # Production deployment

# View logs
vercel logs

# Environment variables
vercel env ls
vercel env add VARIABLE_NAME
```

## 🐛 Troubleshooting
- **Build fails**: Run `npm run build` locally first
- **Module not found**: Check `package.json` dependencies
- **Icons not loading**: Verify Clearbit API access
- **Type errors**: Ensure all `.tsx` extensions for JSX files

## 🎯 Next Steps After Deployment
1. Set up custom domain in Vercel dashboard
2. Configure analytics (Vercel Analytics)
3. Enable error tracking
4. Set up CI/CD for auto-deployments
5. Monitor performance via Vercel dashboard

---
**Ready to deploy!** Run `vercel` from project root.

# SubTract - Login Credentials

## Demo Account

Use the following credentials to access the SubTract application:

- **Email:** `user@subtract.com`
- **Password:** `Demo@2025Secure!`

## What Was Fixed

The original demo password (`password123`) was flagged as compromised by Google Password Manager and your browser's security features, which was causing the persistent "Change your password" popup that prevented you from logging in.

**Solution:** Updated to a stronger, non-breached password that won't trigger browser security warnings.

## Access the App

1. Dev Server: `http://localhost:3000`
2. Production Build: `npm run build` then `npm start`
3. Deploy to Vercel: `npm run build` followed by Vercel CLI deployment

## Updated Files

- `src/components/auth/Login.tsx` - Updated default password
- `src/pages/api/auth/login.ts` - Updated API validation

---

**Note:** In a production environment, passwords should never be hardcoded. This is a demo app using dummy credentials for testing purposes.

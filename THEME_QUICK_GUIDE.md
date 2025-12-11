# 🎨 Theme System - Quick Guide

## How to Use the Theme Feature

### For Users
1. **Open the app** at `http://localhost:3003`
2. **Navigate to Dashboard** by clicking "Dashboard" in the sidebar
3. **Look for the Theme Toggle** at the top of the left sidebar (Sun/Moon icon)
4. **Click the toggle** to switch between Light and Dark modes
5. **Your preference is saved** automatically - it persists even after refresh

### Visual Changes When Switching Themes

#### Dark Mode (Default)
- Background: Deep navy (#0F0F1E)
- Text: Light gray (#E5E7EB)
- Page Background: Purple-to-pink gradient
- Cards: Glassmorphic with white glow
- Logo: Purple-to-cyan gradient

#### Light Mode
- Background: Pure white (#FFFFFF)
- Text: Dark navy (#1a1a2e)
- Page Background: Soft pastel colors
- Cards: White with subtle shadows
- Logo: Purple gradient (still visible)

## Pages That Support Full Theme

✅ **Landing/Onboarding** - Full background change
✅ **Login Page** - Full background change
✅ **Signup Page** - Full background change
✅ **Dashboard** - All components themed
✅ **Subscriptions** - Themed cards and text
✅ **Insights** - Charts colors adapted
✅ **Profile** - Themed content
✅ **Settings** - Themed controls
✅ **All Modals & Popups** - Theme-aware

## For Developers

### Using Theme in a Component
```tsx
import { useTheme } from '@/context/ThemeContext';

export function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Using CSS Variables
All colors are available as CSS variables in both `globals.css` and component styles:

```css
/* Dark Mode (Default) */
:root {
  --background: #0F0F1E;
  --foreground: #E5E7EB;
  --primary: #8B5CF6;
  --secondary: #06B6D4;
}

/* Light Mode */
:root.light {
  --background: #ffffff;
  --foreground: #1a1a2e;
  --primary: #7c3aed;
  --secondary: #0891b2;
}
```

### Conditional Styling
```tsx
const { theme } = useTheme();

<div style={{
  backgroundColor: theme === 'light' ? '#ffffff' : '#0F0F1E'
}}>
```

## CSS Classes
- `.glass` - Glassmorphic card (auto-themed)
- `.glass-strong` - Strong glassmorphic effect (auto-themed)
- `.dark` - Applied to `<html>` in dark mode
- `.light` - Applied to `<html>` in light mode

## File Structure
```
src/
├── context/
│   └── ThemeContext.tsx          ← Theme provider and hook
├── styles/
│   └── globals.css               ← CSS variables for both themes
├── components/
│   ├── Onboarding.tsx            ← Theme-aware landing
│   ├── auth/
│   │   ├── Login.tsx             ← Theme-aware login
│   │   └── Signup.tsx            ← Theme-aware signup
│   ├── Logo.tsx                  ← Adaptive logo
│   └── Navigation.tsx            ← Theme toggle button
└── pages/
    └── _app.tsx                  ← App-wide theme setup
```

## Troubleshooting

### Theme Not Saving?
- Check if localStorage is enabled in browser
- Try clearing browser cache
- Check DevTools Console for errors

### Background Not Changing?
- Verify you're on a page that supports theming
- Check if browser cached old CSS
- Try hard refresh (Ctrl+Shift+R)

### Text Not Visible?
- Ensure you have the latest CSS from `globals.css`
- Check for custom inline styles overriding theme
- Verify contrast meets WCAG AA standard

### Logo Blended?
- Light mode logo uses dark text color now
- Should be clearly visible on white background
- If not, clear browser cache

## Performance Notes
- Theme switching is instant (no page reload)
- Uses CSS variables (hardware-accelerated)
- Theme preference stored in localStorage
- Smooth 0.3s transition between themes
- No flickering or layout shifts

## Browser Support
✅ Chrome/Edge 49+
✅ Firefox 31+
✅ Safari 9.1+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Additional Resources
- See `THEME_FIXES_COMPLETE.md` for detailed technical information
- Check `src/context/ThemeContext.tsx` for theme logic
- Review `src/styles/globals.css` for all CSS variables

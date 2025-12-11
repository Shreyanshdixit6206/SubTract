# SubTract - Next.js Migration Script
# Run this script to complete the migration from Vite to Next.js

Write-Host "🚀 SubTract - Next.js Migration Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Backup old files
Write-Host "📦 Step 1: Backing up old configuration files..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Copy-Item "package.json" "package-vite-old.json"
    Write-Host "✅ Backed up package.json to package-vite-old.json" -ForegroundColor Green
}

if (Test-Path "vite.config.ts") {
    Copy-Item "vite.config.ts" "vite.config.ts.old"
    Write-Host "✅ Backed up vite.config.ts" -ForegroundColor Green
}

# Step 2: Replace package.json
Write-Host ""
Write-Host "📝 Step 2: Setting up Next.js package.json..." -ForegroundColor Yellow
if (Test-Path "package-next.json") {
    Copy-Item "package-next.json" "package.json" -Force
    Write-Host "✅ Replaced package.json with Next.js dependencies" -ForegroundColor Green
} else {
    Write-Host "❌ Error: package-next.json not found!" -ForegroundColor Red
    exit 1
}

# Step 3: Clean old dependencies
Write-Host ""
Write-Host "🧹 Step 3: Cleaning old dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force
    Write-Host "✅ Removed old node_modules" -ForegroundColor Green
}

if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force
    Write-Host "✅ Removed old package-lock.json" -ForegroundColor Green
}

# Step 4: Install Next.js dependencies
Write-Host ""
Write-Host "📦 Step 4: Installing Next.js dependencies..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes..." -ForegroundColor Gray
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Error installing dependencies!" -ForegroundColor Red
    exit 1
}

# Step 5: Remove old Vite files (optional)
Write-Host ""
Write-Host "🗑️  Step 5: Removing old Vite configuration files..." -ForegroundColor Yellow
$removeVite = Read-Host "Do you want to remove old Vite files? (y/n)"
if ($removeVite -eq "y") {
    if (Test-Path "vite.config.ts") {
        Remove-Item "vite.config.ts" -Force
        Write-Host "✅ Removed vite.config.ts" -ForegroundColor Green
    }
    if (Test-Path "index.html") {
        Copy-Item "index.html" "index.html.old"
        Remove-Item "index.html" -Force
        Write-Host "✅ Removed index.html (backed up as index.html.old)" -ForegroundColor Green
    }
} else {
    Write-Host "⏭️  Skipped removing Vite files" -ForegroundColor Gray
}

# Step 6: Verify setup
Write-Host ""
Write-Host "🔍 Step 6: Verifying setup..." -ForegroundColor Yellow
$filesOk = $true

$requiredFiles = @(
    "next.config.js",
    "src/pages/_app.tsx",
    "src/pages/_document.tsx",
    "src/pages/index.tsx",
    "src/context/AuthContext.tsx",
    "src/context/SubscriptionContext.tsx",
    "src/utils/dummyData.ts",
    "tailwind.config.js",
    "tsconfig.json"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (missing!)" -ForegroundColor Red
        $filesOk = $false
    }
}

if (-not $filesOk) {
    Write-Host ""
    Write-Host "⚠️  Warning: Some required files are missing!" -ForegroundColor Yellow
    Write-Host "   Please check the DEPLOYMENT-GUIDE.md for details" -ForegroundColor Yellow
}

# Final message
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "✨ Migration Complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Start dev server:  npm run dev" -ForegroundColor White
Write-Host "  2. Visit:            http://localhost:3000" -ForegroundColor White
Write-Host "  3. Login with:" -ForegroundColor White
Write-Host "     Email:            user@subtract.com" -ForegroundColor Gray
Write-Host "     Password:         password123" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Documentation:" -ForegroundColor Cyan
Write-Host "  - DEPLOYMENT-GUIDE.md   - Complete migration guide" -ForegroundColor White
Write-Host "  - README-DEPLOYMENT.md  - Full documentation" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready to Deploy?" -ForegroundColor Cyan
Write-Host "  git add ." -ForegroundColor White
Write-Host "  git commit -m 'Migrate to Next.js'" -ForegroundColor White
Write-Host "  git push" -ForegroundColor White
Write-Host "  Then deploy on Vercel!" -ForegroundColor White
Write-Host ""
Write-Host "Made with 💜 | SubTract - Subtract the unnecessary, Add the valuable" -ForegroundColor Magenta

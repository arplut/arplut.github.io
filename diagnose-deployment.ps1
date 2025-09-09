# 🔍 GitHub Pages Deployment Diagnostics

Write-Host "=== GITHUB PAGES DEPLOYMENT DIAGNOSTICS ===" -ForegroundColor Cyan
Write-Host ""

# Check 1: Local build test
Write-Host "🔧 STEP 1: Testing local build..." -ForegroundColor Yellow
Write-Host "Running: npm run build" -ForegroundColor Gray
try {
    $buildResult = npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Local build: SUCCESS" -ForegroundColor Green
        Write-Host "   - Built files are in ./dist folder" -ForegroundColor Gray
    } else {
        Write-Host "❌ Local build: FAILED" -ForegroundColor Red
        Write-Host "   Error details:" -ForegroundColor Red
        Write-Host $buildResult -ForegroundColor Red
        Write-Host ""
        Write-Host "🛠️  Fix local build errors first before deploying." -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ npm run build failed to execute" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""

# Check 2: Environment variables check
Write-Host "🔑 STEP 2: Checking local environment variables..." -ForegroundColor Yellow
$envFile = ".env"
if (Test-Path $envFile) {
    Write-Host "✅ .env file found locally" -ForegroundColor Green
    Write-Host "   Local .env contents (values hidden):" -ForegroundColor Gray
    Get-Content $envFile | ForEach-Object { 
        if ($_ -match "^([^=]+)=") {
            Write-Host "   $($matches[1])=***" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "⚠️  .env file not found locally (expected for GitHub deployment)" -ForegroundColor Yellow
}

Write-Host ""

# Check 3: Firebase config check
Write-Host "🔥 STEP 3: Checking Firebase configuration..." -ForegroundColor Yellow
$firebaseConfig = "src/config/firebase.config.ts"
if (Test-Path $firebaseConfig) {
    Write-Host "✅ Firebase config file found" -ForegroundColor Green
    $configContent = Get-Content $firebaseConfig -Raw
    if ($configContent -match "import\.meta\.env\.VITE_FIREBASE_API_KEY") {
        Write-Host "✅ Uses environment variables properly" -ForegroundColor Green
    } else {
        Write-Host "❌ Still using hardcoded values" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Firebase config file missing" -ForegroundColor Red
}

Write-Host ""

# Check 4: GitHub Pages settings check
Write-Host "🌐 STEP 4: GitHub Pages deployment checklist..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Please manually verify these in your browser:" -ForegroundColor Gray
Write-Host ""
Write-Host "   📋 GitHub Repository Settings:" -ForegroundColor White
Write-Host "      1. Go to: https://github.com/arplut/arplut.github.io/settings/pages" -ForegroundColor Gray
Write-Host "      2. Source should be: GitHub Actions (not Deploy from branch)" -ForegroundColor Gray
Write-Host ""
Write-Host "   🔑 GitHub Secrets:" -ForegroundColor White
Write-Host "      1. Go to: https://github.com/arplut/arplut.github.io/settings/secrets/actions" -ForegroundColor Gray
Write-Host "      2. Required secrets:" -ForegroundColor Gray
Write-Host "         - VITE_FIREBASE_API_KEY" -ForegroundColor Gray
Write-Host "         - VITE_FIREBASE_AUTH_DOMAIN" -ForegroundColor Gray
Write-Host "         - VITE_FIREBASE_PROJECT_ID" -ForegroundColor Gray
Write-Host "         - VITE_FIREBASE_STORAGE_BUCKET" -ForegroundColor Gray
Write-Host "         - VITE_FIREBASE_MESSAGING_SENDER_ID" -ForegroundColor Gray
Write-Host "         - VITE_FIREBASE_APP_ID" -ForegroundColor Gray
Write-Host "         - VITE_FIREBASE_MEASUREMENT_ID" -ForegroundColor Gray
Write-Host "         - VITE_FIREBASE_VAPID_KEY" -ForegroundColor Gray
Write-Host ""
Write-Host "   🚀 GitHub Actions:" -ForegroundColor White
Write-Host "      1. Go to: https://github.com/arplut/arplut.github.io/actions" -ForegroundColor Gray
Write-Host "      2. Check latest 'Deploy to GitHub Pages' workflow" -ForegroundColor Gray
Write-Host "      3. Look for red X (failed) or green checkmark (success)" -ForegroundColor Gray
Write-Host ""

# Check 5: Common issues
Write-Host "🐛 STEP 5: Common issues to check..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   If GitHub Action is failing:" -ForegroundColor White
Write-Host "   - Check the Actions tab for specific error messages" -ForegroundColor Gray
Write-Host "   - Ensure all 8 secrets are added with exact names (case-sensitive)" -ForegroundColor Gray
Write-Host "   - Make sure you're using NEW/ROTATED API keys (not exposed ones)" -ForegroundColor Gray
Write-Host ""
Write-Host "   If site loads but is blank/broken:" -ForegroundColor White
Write-Host "   - Open browser console (F12) and check for errors" -ForegroundColor Gray
Write-Host "   - Look for Firebase initialization errors" -ForegroundColor Gray
Write-Host "   - Check if assets are loading properly" -ForegroundColor Gray
Write-Host ""

Write-Host "=== NEXT ACTIONS ===" -ForegroundColor Magenta
Write-Host ""

$buildStatus = if ($LASTEXITCODE -eq 0) { "✅ PASSED" } else { "❌ FAILED" }
Write-Host "Local Build Status: $buildStatus" -ForegroundColor $(if ($LASTEXITCODE -eq 0) { "Green" } else { "Red" })

Write-Host ""
Write-Host "What to check next:" -ForegroundColor White

if ($LASTEXITCODE -ne 0) {
    Write-Host "1. 🔧 Fix local build errors first" -ForegroundColor Red
    Write-Host "2. Run 'npm ci' to ensure dependencies are correct" -ForegroundColor Red
    Write-Host "3. Check for TypeScript errors" -ForegroundColor Red
} else {
    Write-Host "1. ✅ Local build works - check GitHub Actions" -ForegroundColor Green
    Write-Host "2. 🔑 Verify all GitHub secrets are added" -ForegroundColor Yellow
    Write-Host "3. 🌐 Check GitHub Pages source is set to GitHub Actions" -ForegroundColor Yellow
    Write-Host "4. 🚀 Look at latest deployment in Actions tab" -ForegroundColor Yellow
}
}

Write-Host ""
Write-Host "📋 TELL ME:" -ForegroundColor Cyan
Write-Host "1. Are you seeing build failures in GitHub Actions?" -ForegroundColor White
Write-Host "2. Is the site loading but blank?" -ForegroundColor White
Write-Host "3. Are there specific error messages?" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to continue..."

# GitHub and Vercel Deployment Guide

## ✅ What to Upload to GitHub

**Upload the entire `HEART-FINAL` folder:**
```
HEART-FINAL/
├── .gitignore          ✅ Upload (updated)
├── README.md           ✅ Upload
├── package.json        ✅ Upload (Vercel needs this!)
├── public/             ✅ Upload
└── src/                ✅ Upload
```

**DO NOT Upload:**
- ❌ `node_modules/` - Excluded by .gitignore (Vercel installs automatically)
- ❌ `/build` - Excluded by .gitignore (Vercel builds automatically)
- ❌ Any log files - Excluded by .gitignore

---

## Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `heart-sound-analyzer` (or any name you prefer)
3. Make it **Public** or **Private** (both work with Vercel)
4. **DO NOT** initialize with README (your folder already has one)
5. Click **Create repository**

---

### Step 2: Upload Code to GitHub

**Option A: Using GitHub Desktop (Easiest)**
1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop → File → Add Local Repository
3. Browse to: `e:\heart-sound-webapp-windows\HEART-SOUND-COMPLETE-BOTH-MODES\HEART-FINAL`
4. Click "create a repository" if prompted
5. Click "Publish repository" → Select your account → Publish

**Option B: Using Git Command Line**
```bash
cd e:\heart-sound-webapp-windows\HEART-SOUND-COMPLETE-BOTH-MODES\HEART-FINAL

# Initialize git
git init

# Add all files (node_modules excluded by .gitignore)
git add .

# Commit
git commit -m "Initial commit - Heart Sound Analyzer"

# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/heart-sound-analyzer.git

# Push
git push -u origin main
```

---

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click **"Add New Project"**
4. **Import** your `heart-sound-analyzer` repository
5. Vercel will auto-detect it's a React app
6. **Before deploying**, verify these settings:
   - **Framework Preset:** Create React App ✅
   - **Build Command:** `npm run build` ✅
   - **Output Directory:** `build` ✅
   - **Install Command:** `npm install` ✅

7. Click **"Deploy"**
8. Wait 2-3 minutes for deployment to complete
9. You'll get a URL like: `https://heart-sound-analyzer.vercel.app`

---

## Important Notes

### ✅ Your React App is Ready
- API URLs already point to your EC2: `http://3.214.247.241`
- Both Normal and Advanced modes are working
- CORS is configured on the backend

### ⚠️ HTTPS Warning
Vercel serves your app over **HTTPS** (`https://your-app.vercel.app`), but your backend API is **HTTP** (`http://3.214.247.241`).

**This may cause "Mixed Content" warnings in browsers!**

**Solutions:**
1. **Quick Fix:** Test in browsers that allow mixed content
2. **Proper Fix:** Add HTTPS to your EC2 backend using:
   - AWS Certificate Manager + Load Balancer, OR
   - Let's Encrypt SSL certificate

---

## Testing After Deployment

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Test **Normal Mode**:
   - Upload a heart sound WAV file
   - Click "Analyze Heart Sound"
   - Check if results display correctly
3. Test **Advanced Mode**:
   - Upload 4 WAV files (one per valve)
   - Click "Analyze All Channels"
   - Check if all 4 valve results display
4. Test **History**:
   - Click on saved reports in the sidebar
   - Verify they load correctly

---

## If Deployment Fails

### Error: "Build failed"
**Check:** Is `package.json` included in your GitHub repo?

### Error: "Module not found"
**Solution:** Vercel will install from `package.json` automatically. Make sure it's committed.

### Error: "Cannot GET /"
**Solution:** Vercel serves from `/build` folder. Make sure build command is `react-scripts build`.

---

##📁 Folder Structure Checklist

Before pushing to GitHub, verify:
```
HEART-FINAL/
├── .gitignore          ← Updated with node_modules exclusion
├── package.json        ← Contains all dependencies
├── public/
│   └── index.html
└── src/
    ├── App.js
    ├── App.css
    └── pages/
        ├── NormalMode.js
        └── AdvancedMode.js
```

---

## 🎯 Quick Summary

1. ✅ Updated `.gitignore` (excludes node_modules)
2. ✅ Upload `HEART-FINAL` folder to GitHub (WITHOUT node_modules)
3. ✅ Import repository to Vercel
4. ✅ Deploy (Vercel handles npm install & build automatically)
5. ✅ Test your app at the Vercel URL

**Your app is ready for deployment!** 🚀

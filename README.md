# Betopia Group - Sales Performance Leaderboard

Real-time sales performance leaderboard and TV display dashboard with live Firebase Firestore cloud synchronization, podium rankings, department targets, and administrative controls.

## 🚀 Deploying to Vercel

This application is fully pre-configured for instant zero-configuration deployment on [Vercel](https://vercel.com).

### Option 1: Deploy via GitHub (Recommended for CI/CD)
1. **Export / Push to GitHub**: In AI Studio, click the menu in the top-right and select **Export to GitHub** (or download ZIP and push to a GitHub repository).
2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository.
   - Framework Preset will automatically detect **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Click **Deploy**. Every subsequent push to your repository will automatically trigger CI/CD deployment on Vercel.

### Option 2: Deploy using Vercel CLI
If you are working from a terminal with the Vercel CLI installed:
```bash
npm i -g vercel
vercel
```
Follow the prompts to link and deploy to production:
```bash
vercel --prod
```

## ⚙️ Features
- **Live Database Syncing**: Integrated with Firebase Firestore so all admin updates, logged sales, target changes, and user accounts update in real-time on all screens.
- **16:9 TV Display Mode**: Optimized for office TV monitors and live scoreboards.
- **Role-Based Access**:
  - **Admin**: Full executive access (Admin ID: `11684`, Pass: `51643600`) + User Account Management.
  - **Editor**: Department & deal editing rights.

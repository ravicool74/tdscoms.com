# TDSCOMS Publishing & Deployment Guide

This guide details how to publish and deploy the **TDSCOMS (Road Division Hilsa Document Management System)** to your GitHub repository and custom domain:
- **GitHub Repository**: [`https://github.com/kumarravishankar3-rgb/tdscoms.com`](https://github.com/kumarravishankar3-rgb/tdscoms.com)
- **Live Custom Domain**: `https://tdscoms.com`
- **GitHub Pages Fallback URL**: `https://kumarravishankar3-rgb.github.io/tdscoms.com/`

---

## Files Prepared for Publishing

All production deployment files are prepared in both the root folder `e:\MY PROJECTS\` and the `publish/` folder:

| File | Purpose |
|------|---------|
| `index.html` | Application entry point |
| `app.js` | Complete DMS application logic & localStorage database |
| `styles.css` | UI styling, responsive layout, and print styles |
| `recovery.css` | Emergency password/pin recovery styling |
| `CNAME` | Custom domain mapping configured to `tdscoms.com` |
| `.nojekyll` | Bypasses Jekyll processing to serve assets immediately |
| `404.html` | SPA router fallback for GitHub Pages refreshes |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for automatic Pages deployment |

---

## Method 1: Publish via GitHub Web Interface (Fastest & Simplest)

If you don't have Git command-line installed, you can upload directly in your browser:

1. Open the repository: [https://github.com/kumarravishankar3-rgb/tdscoms.com](https://github.com/kumarravishankar3-rgb/tdscoms.com)
2. Click **Add file** -> **Upload files**.
3. Drag and drop all the files from your `e:\MY PROJECTS\` (or `publish\`) directory:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `recovery.css`
   - `CNAME`
   - `.nojekyll`
   - `404.html`
4. In the commit message box, enter: `Publish TDSCOMS web application`
5. Select **Commit directly to the `main` branch**.
6. Click **Commit changes**.

---

## Method 2: Publish via Git Command Line

If you have Git installed on your system:

```powershell
cd "e:\MY PROJECTS"
git init
git remote add origin https://github.com/kumarravishankar3-rgb/tdscoms.com.git
git branch -M main
git add index.html app.js styles.css recovery.css CNAME .nojekyll 404.html .github/
git commit -m "Publish TDSCOMS application to tdscoms.com"
git push -u origin main --force
```

---

## Step 3: Enable GitHub Pages in Repository Settings

1. Go to **Settings** in your repository: [https://github.com/kumarravishankar3-rgb/tdscoms.com/settings/pages](https://github.com/kumarravishankar3-rgb/tdscoms.com/settings/pages)
2. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch` (or `GitHub Actions` if you want automatic build actions)
   - **Branch**: Select `main`
   - **Folder**: Select `/ (root)`
   - Click **Save**.
3. Under **Custom domain**:
   - Verify `tdscoms.com` is entered.
   - Click **Save**.
   - Wait for the DNS check to pass (green checkmark).
   - Check the box **Enforce HTTPS**.

---

## Step 4: DNS Configuration (At your Domain Registrar)

Ensure your domain registrar (GoDaddy, Namecheap, Cloudflare, BigRock, etc.) has these DNS records pointing to GitHub Pages:

### A Records (Apex Domain `@` / `tdscoms.com`):
| Type | Name / Host | Value | TTL |
|------|-------------|-------|-----|
| `A` | `@` | `185.199.108.153` | Automatic / 3600 |
| `A` | `@` | `185.199.109.153` | Automatic / 3600 |
| `A` | `@` | `185.199.110.153` | Automatic / 3600 |
| `A` | `@` | `185.199.111.153` | Automatic / 3600 |

### CNAME Record (Subdomain `www`):
| Type | Name / Host | Value | TTL |
|------|-------------|-------|-----|
| `CNAME` | `www` | `kumarravishankar3-rgb.github.io` | Automatic / 3600 |

---

## Verification & Live Access

Once published, your application is available at:
- 🌐 **Custom Domain**: [https://tdscoms.com](https://tdscoms.com)
- 🌐 **GitHub Pages URL**: [https://kumarravishankar3-rgb.github.io/tdscoms.com/](https://kumarravishankar3-rgb.github.io/tdscoms.com/)

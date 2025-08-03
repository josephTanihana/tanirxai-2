# AI Code Assistant - Deployment Guide

This guide covers deployment options for all versions of the AI Code Assistant across different platforms.

## 🌐 Web Deployment

### Option 1: GitHub Pages (Free)
```bash
# Create a new repository on GitHub
# Push your code to the repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ai-code-assistant-website.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Go to Settings > Pages > Source > Deploy from branch
# Select main branch and save
```

### Option 2: Netlify (Free)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=.
```

### Option 3: Vercel (Free)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

### Option 4: Firebase Hosting (Free)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Deploy
firebase deploy
```

## 📱 Mobile Deployment

### iOS Web App
1. **Add to Home Screen**:
   - Open the mobile version in Safari
   - Tap the share button
   - Select "Add to Home Screen"
   - Customize the name and icon

2. **PWA Features**:
   - The mobile version includes PWA features
   - Works offline after first load
   - Native app-like experience

### Android Web App
1. **Add to Home Screen**:
   - Open the mobile version in Chrome
   - Tap the menu (three dots)
   - Select "Add to Home Screen"
   - Customize the name and icon

2. **Chrome PWA**:
   - Automatically installs as PWA
   - Works offline
   - Native Android integration

## 🖥️ Windows Desktop Deployment

### Development Build
```bash
# Navigate to desktop app directory
cd desktop-app

# Install dependencies
npm install

# Run in development mode
npm start
```

### Production Build
```bash
# Build for Windows
npm run build-win

# The executable will be in dist/ folder
# Install the generated .exe file
```

### Distribution
1. **Create Installer**:
   ```bash
   npm run dist
   ```

2. **Sign the Application** (Recommended):
   - Purchase a code signing certificate
   - Sign the executable for Windows security

3. **Distribute**:
   - Upload to your website
   - Share via email
   - Use Windows Store (requires Microsoft Developer account)

## 🚀 Advanced Deployment Options

### Docker Deployment
```dockerfile
# Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t ai-code-assistant .
docker run -p 80:80 ai-code-assistant
```

### AWS S3 + CloudFront
```bash
# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload files
aws s3 sync . s3://your-bucket-name --delete

# Create CloudFront distribution
# Configure for HTTPS and caching
```

### Azure Static Web Apps
```bash
# Install Azure CLI
# Create static web app
az staticwebapp create \
  --name ai-code-assistant \
  --source . \
  --location "East US"
```

## 🔧 Environment Configuration

### Web Version
Create a `.env` file for environment variables:
```env
# API Configuration
API_URL=https://api.example.com
API_KEY=your-api-key

# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Feature Flags
ENABLE_OFFLINE_MODE=true
ENABLE_NOTIFICATIONS=true
```

### Desktop Version
Create `config.json` in the desktop app directory:
```json
{
  "api": {
    "url": "https://api.example.com",
    "key": "your-api-key"
  },
  "features": {
    "autoSave": true,
    "notifications": true,
    "offlineMode": true
  },
  "ui": {
    "theme": "auto",
    "codeStyle": "standard"
  }
}
```

## 📊 Performance Optimization

### Web Version
1. **Minify Assets**:
   ```bash
   # Install minification tools
   npm install -g uglify-js clean-css

   # Minify JavaScript
   uglifyjs script.js -o script.min.js

   # Minify CSS
   cleancss styles.css -o styles.min.css
   ```

2. **Enable Gzip Compression**:
   ```nginx
   # nginx.conf
   gzip on;
   gzip_types text/css application/javascript;
   ```

3. **Cache Headers**:
   ```nginx
   # Cache static assets
   location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

### Mobile Version
1. **Service Worker**:
   ```javascript
   // sw.js
   const CACHE_NAME = 'ai-code-assistant-v1';
   const urlsToCache = [
       '/',
       '/mobile-app.html',
       '/mobile-styles.css',
       '/mobile-script.js'
   ];
   ```

2. **App Manifest**:
   ```json
   {
     "name": "AI Code Assistant",
     "short_name": "AI Code",
     "start_url": "/mobile-app.html",
     "display": "standalone",
     "background_color": "#667eea",
     "theme_color": "#667eea"
   }
   ```

### Desktop Version
1. **Electron Optimization**:
   ```javascript
   // main.js
   app.commandLine.appendSwitch('--disable-gpu');
   app.commandLine.appendSwitch('--no-sandbox');
   ```

2. **Memory Management**:
   ```javascript
   // Clean up resources
   mainWindow.on('closed', () => {
       mainWindow = null;
   });
   ```

## 🔒 Security Considerations

### Web Version
1. **HTTPS Only**:
   ```nginx
   # Redirect HTTP to HTTPS
   server {
       listen 80;
       return 301 https://$server_name$request_uri;
   }
   ```

2. **Content Security Policy**:
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' 'unsafe-inline';">
   ```

3. **XSS Protection**:
   ```html
   <meta http-equiv="X-XSS-Protection" content="1; mode=block">
   ```

### Desktop Version
1. **Code Signing**:
   ```bash
   # Sign the executable
   signtool sign /f certificate.pfx /p password ai-code-assistant.exe
   ```

2. **Sandboxing**:
   ```javascript
   // Enable sandboxing
   webPreferences: {
       sandbox: true,
       contextIsolation: true
   }
   ```

## 📈 Monitoring and Analytics

### Web Analytics
```javascript
// Google Analytics
gtag('config', 'GA_MEASUREMENT_ID');

// Custom events
gtag('event', 'code_generated', {
    'language': language,
    'prompt_length': prompt.length
});
```

### Desktop Analytics
```javascript
// Electron analytics
const analytics = require('electron-google-analytics');
analytics.init('GA_MEASUREMENT_ID');

// Track usage
analytics.trackEvent('code_generated', {
    language: language,
    prompt_length: prompt.length
});
```

## 🚀 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy AI Code Assistant

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Netlify Deployment
```yaml
# netlify.toml
[build]
  publish = "."
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📞 Support and Maintenance

### Monitoring
1. **Uptime Monitoring**: Use UptimeRobot or Pingdom
2. **Error Tracking**: Implement Sentry for error reporting
3. **Performance Monitoring**: Use Google PageSpeed Insights

### Updates
1. **Web Version**: Deploy updates through your hosting platform
2. **Mobile Version**: Update the web app, users get updates automatically
3. **Desktop Version**: Implement auto-updater in Electron

### Backup
1. **Code Repository**: Use Git for version control
2. **Configuration**: Backup environment variables and config files
3. **User Data**: Implement data export/import features

---

**Deployment Checklist**:
- [ ] Test all features before deployment
- [ ] Configure HTTPS for web version
- [ ] Set up monitoring and analytics
- [ ] Implement error tracking
- [ ] Create backup strategy
- [ ] Document deployment process
- [ ] Set up CI/CD pipeline
- [ ] Configure auto-updates
- [ ] Test on all target platforms
- [ ] Monitor performance and user feedback 
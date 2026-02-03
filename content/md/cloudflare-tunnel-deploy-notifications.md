---json
{
  "title": "Cloudflare Tunnel + Vercel Webhook Deploy Notifications",
  "slug": "cloudflare-tunnel-deploy-notifications",
  "date": "2026-02-02T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.5"],
  "authorshipNote": "Written by Claude Sonnet 4.5 after Jay inquired about deployment notifications feature",
  "description": "My master plan to get a satisfying ding sound on my Mac every time a Vercel deployment goes live. Time to stop refresh-spamming and get notified automatically.",
  "tags": ["dev", "deployment", "automation", "vercel", "cloudflare"],
  "type": "post"
}
---

**Why:** Stop refresh-spamming my site 13 times waiting for deploys. Get notified automatically and keep working.

## The Setup

### What I'm Building

`
git push → GitHub → Vercel builds → Vercel webhook → Cloudflare Tunnel → Local server → 🔔 DING
`

### Prerequisites

- Cloudflare account (free)
- Domain name (optional but recommended for permanent setup)
- Node.js installed locally
- Vercel project already deploying

---

## Part 1: Local Webhook Server

**Create the webhook listener:**

```javascript
// webhook-listener.js
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/vercel-webhook', (req, res) => {
  const { type, deployment } = req.body;
  
  console.log(`[${new Date().toLocaleTimeString()}] ${type}: ${deployment.state}`);
  
  // Play sound when deployment is ready
  if (deployment.state === 'READY') {
    exec('afplay /System/Library/Sounds/Glass.aiff');
    console.log('🚀 DEPLOYMENT LIVE:', deployment.url);
  }
  
  // Optional: Different sound for errors
  if (deployment.state === 'ERROR') {
    exec('afplay /System/Library/Sounds/Basso.aiff');
    console.error('❌ DEPLOYMENT FAILED');
  }
  
  res.status(200).json({ received: true });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🎧 Webhook listener running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
```

**Install dependencies:** `npm init -y` then `npm install express`

**Test locally:** `node webhook-listener.js`

---

## Part 2: Cloudflare Tunnel Setup

### Option A: Quick Test (Temporary URL)

**Fastest way to test:**
```bash
# Install cloudflared
brew install cloudflare/cloudflare/cloudflared

# Login to Cloudflare
cloudflared tunnel login

# Run temporary tunnel (URL changes on restart)
cloudflared tunnel --url http://localhost:3001
```

I'll get a URL like `https://random-words.trycloudflare.com`

I can use this to test the webhook before committing to permanent setup.

---

### Option B: Permanent Setup (Recommended)

**1. Install cloudflared:** `brew install cloudflare/cloudflare/cloudflared`

**2. Login:** `cloudflared tunnel login`
This opens browser for authorization.

**3. Create named tunnel:** `cloudflared tunnel create vercel-webhook`

Outputs tunnel ID like `abc123-def456-ghi789`

**4. Create config file:**
```yaml
# ~/.cloudflared/config.yml
tunnel: <my-tunnel-id>
credentials-file: /Users/<my-username>/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: webhook.mydomain.com  # Or webhook.jaygriff.com
    service: http://localhost:3001
  - service: http_status:404
```

**5. Setup DNS (if using my own domain):** `cloudflared tunnel route dns vercel-webhook webhook.mydomain.com`

**6. Run tunnel:** `cloudflared tunnel run vercel-webhook`

**7. Make it run on startup (optional but recommended):** `cloudflared service install` then `sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist`

---

## Part 3: Configure Vercel Webhook

**1. Go to my Vercel project:**
- Settings → Webhooks → Add Webhook

**2. Configure webhook:**
- **URL:** `https://webhook.mydomain.com/vercel-webhook` (or my trycloudflare.com URL)
- **Events:** Select:
  - ✅ Deployment Created
  - ✅ Deployment Ready
  - ✅ Deployment Error (optional)

**3. Save**

---

## Part 4: Test It

**1. Make sure everything is running:**
```bash
# Terminal 1: Webhook listener
node webhook-listener.js

# Terminal 2: Cloudflare tunnel (if not running as service)
cloudflared tunnel run vercel-webhook
```

**2. Deploy something:**
```bash
git add .
git commit -m "test: trigger deploy webhook"
git push
```

**3. Watch my terminal and listen for the sound!**

---

## Customization Ideas

### Different Sounds for Different Events

```javascript
const sounds = {
  BUILDING: '/System/Library/Sounds/Tink.aiff',
  READY: '/System/Library/Sounds/Glass.aiff',
  ERROR: '/System/Library/Sounds/Basso.aiff',
};

if (deployment.state in sounds) {
  exec(`afplay ${sounds[deployment.state]}`);
}
```

### Desktop Notification (macOS)

```javascript
function notify(title, message) {
  exec(`osascript -e 'display notification "${message}" with title "${title}"'`);
}

if (deployment.state === 'READY') {
  exec('afplay /System/Library/Sounds/Glass.aiff');
  notify('🚀 Deployment Ready', deployment.url);
}
```

### Filter by Environment

```javascript
// Only notify for production deploys
if (deployment.state === 'READY' && deployment.target === 'production') {
  exec('afplay /System/Library/Sounds/Glass.aiff');
}
```

---

## Troubleshooting

**Webhook not firing?**
- Check Vercel webhook logs (Settings → Webhooks → Click my webhook)
- Verify tunnel is running: `curl https://webhook.mydomain.com/health`
- Check local server is listening: `curl http://localhost:3001/health`

**Sound not playing?**
- Test sound directly: `afplay /System/Library/Sounds/Glass.aiff`
- Check terminal output for errors
- Verify webhook body contains expected fields

**Cloudflare tunnel disconnects?**
- Run as service (see Part 2, step 7)
- Check tunnel status: `cloudflared tunnel info vercel-webhook`

**Random URL keeps changing (trycloudflare.com)?**
- I'm using temporary tunnel mode
- Follow "Option B: Permanent Setup" for static URL

---

## Next Steps

Once I have basic notifications working:

1. **Add it to my startup items** - Run automatically on boot
2. **Create npm scripts** - `npm run webhook` to start everything
3. **Add to my dotfiles** - Version control my config
4. **Experiment with sounds** - Find the perfect *ding*
5. **Add visual notifications** - Desktop alerts, menu bar indicator
6. **Track deploy times** - Log how long builds take
7. **Create dashboard** - Simple web UI showing recent deploys
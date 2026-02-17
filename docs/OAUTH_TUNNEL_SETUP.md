# Cloudflare Tunnel Setup for OAuth

This guide explains how to set up Cloudflare tunnel to enable Google OAuth for mobile app development.

## Why Tunnel is Needed

Google OAuth requires a publicly accessible callback URL. During development, your localhost isn't accessible from the internet, so we use Cloudflare tunnel to expose your local server.

## Prerequisites

1. Cloudflare account with a domain
2. `cloudflared` installed

## Setup Steps

### 1. Install cloudflared

```bash
# Download and install
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared
```

### 2. Login to Cloudflare

```bash
cloudflared tunnel login
```

This will open a browser window to authorize.

### 3. Create a tunnel

```bash
cloudflared tunnel create matiks-tunnel
```

This creates a tunnel and gives you a UUID.

### 4. Configure DNS

Add a CNAME record in Cloudflare DNS:
- Name: matiks
- Target: <tunnel-uuid>.cfargotunnel.com

### 5. Create config file

Create `~/.cloudflared/config.yml`:

```yaml
tunnel: <tunnel-uuid>
protocol: http2
url: http://localhost:3000
ingress:
  - hostname: matiks.pgstay.in
    service: http://localhost:3000
  - service: http_status:404
```

### 6. Run the tunnel

```bash
cloudflared tunnel --config ~/.cloudflared/config.yml run
```

Or run in background:
```bash
cloudflared tunnel --config ~/.cloudflared/config.yml run &
```

## Google OAuth Configuration

### 1. Create OAuth credentials in Google Cloud Console

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Go to APIs & Services > Credentials
4. Create OAuth 2.0 Client ID
5. Set authorized JavaScript origins:
   - https://matiks.pgstay.in (your tunnel URL)
6. Set authorized redirect URIs:
   - https://matiks.pgstay.in/api/auth/callback/google

### 2. Add credentials to backend

In `apps/elixir/.env`:

```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
BETTER_AUTH_URL=https://matiks.pgstay.in
BETTER_AUTH_SECRET=your-secret-key
```

## Mobile App Configuration

### app.json

Ensure your `app.json` has the scheme:

```json
{
  "expo": {
    "scheme": "matiks"
  }
}
```

### Trusted Origins

The backend auth.ts must include these origins:

```typescript
trustedOrigins: [
  'matiks://',
  'matiks://*',
  'exp://',
  'exp://*',
  'https://matiks.pgstay.in',
]
```

## Testing

1. Start the tunnel: `cloudflared tunnel --config ~/.cloudflared/config.yml run`
2. Start backend: `cd apps/elixir && bun dev`
3. Start mobile: `cd apps/matiks-mobile && bunx expo start`
4. Test OAuth flow in the mobile app

## Troubleshooting

### White screen during OAuth
- Check browser console for errors
- Verify trustedOrigins includes your scheme
- Ensure callback URL matches Google Console

### redirect_uri_mismatch
- Make sure redirect URI in Google Console matches exactly
- Use https://matiks.pgstay.in/api/auth/callback/google

### CORS errors
- Check that CORS is configured to allow your origins
- Add `expo-origin` header handling if needed

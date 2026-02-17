# Matiks Mobile - Claude Code Instructions

## Project Overview

Matiks Mobile is a real-time multiplayer math duel game built with Expo React Native. It connects to a WebSocket backend to enable 1v1 competitive math gameplay.

## Locked Components

**DO NOT MODIFY** these components without explicit user permission:

### Game Components (LOCKED)
- `src/components/game/CircularTimer.tsx` - Timer display with stopwatch icon
- `src/components/game/QuestionCard.tsx` - Question display and numeric keypad
- `src/components/game/PlayerCard.tsx` - Player score cards (shows "You" for current player)
- `src/components/game/index.ts` - Game components export

### Screen Components (LOCKED)
- `src/components/screens/PlayingScreen.tsx` - Main game screen with all game UI

These components have been finalized per user requirements. Any modifications must be approved first.

## Available Commands

```bash
# Start development server
cd apps/matiks-mobile
bunx expo start

# Build for Android
bunx expo prebuild --platform android
bunx expo run:android

# Build for iOS
bunx expo prebuild --platform ios
bunx expo run:ios
```

## Key Files

| File | Purpose |
|------|---------|
| `App.tsx` | Main app - game flow orchestration with auth |
| `src/hooks/useAuth.ts` | Authentication hook using better-auth |
| `src/hooks/useGameSocket.ts` | WebSocket connection management |
| `src/hooks/useTimer.ts` | Game timer logic |
| `src/lib/auth.ts` | Better-auth client configuration |
| `src/components/screens/AuthScreen.tsx` | Google sign-in screen |
| `src/constants/index.ts` | API URLs, colors, game config |

## Authentication

The app uses better-auth for Google OAuth. Setup requires:

1. **Cloudflare Tunnel** - Must be running to enable OAuth
   ```bash
   cloudflared tunnel --config ~/.cloudflared/config.yml run
   ```

2. **Backend** - Must be running with OAuth credentials
   ```bash
   cd apps/elixir
   bun dev
   ```

3. **Environment Variables** in `apps/elixir/.env`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   BETTER_AUTH_URL=https://matiks.pgstay.in
   BETTER_AUTH_SECRET=your-secret
   ```

## Backend Connection

The app connects to:
- Auth: `https://matiks.pgstay.in/api/auth`
- WebSocket: `wss://matiks.pgstay.in/ws`

For local development, update `src/lib/auth.ts` and constants.

## Tunnel Setup

See `/home/ayush/matiks/docs/OAUTH_TUNNEL_SETUP.md` for detailed tunnel configuration.

## Development Notes

- The app uses React Native's built-in components
- Styling is done with React Native's StyleSheet
- SafeAreaView is used for notch handling
- Uses expo-secure-store for session persistence

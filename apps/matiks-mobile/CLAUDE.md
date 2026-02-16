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
| `App.tsx` | Main app - game flow orchestration |
| `src/hooks/useGameSocket.ts` | WebSocket connection management |
| `src/hooks/useTimer.ts` | Game timer logic |
| `src/constants/index.ts` | API URLs, colors, game config |

## Backend Connection

The app connects to the Elixir backend at:
- WebSocket: `ws://192.168.0.69:3000/ws` (update for your network)

Make sure the backend is running:
```bash
cd apps/elixir
bun dev
```

## Development Notes

- The app uses React Native's built-in components (View, Text, TouchableOpacity, etc.)
- No external UI libraries are used
- Styling is done with React Native's StyleSheet
- SafeAreaView is used for notch handling

# Matiks Mobile

A real-time multiplayer math duel game built with Expo React Native for iOS and Android.

## Project Overview

- **Type:** Real-time multiplayer mobile game
- **Platform:** iOS, Android
- **Players:** 2 players per match (1v1 duel)
- **Game:** Solve math problems (addition, subtraction, multiplication)
- **Duration:** 60 seconds per game

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Expo SDK 54 |
| Language | TypeScript |
| UI | React Native |
| State | React Hooks |
| Backend | WebSocket (Bun + Hono) |

## Project Structure

```
apps/matiks-mobile/
├── App.tsx                    # Main app with game flow
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── CircularTimer.tsx   # Timer display
│   │   │   ├── QuestionCard.tsx     # Question & keypad
│   │   │   ├── PlayerCard.tsx       # Player score display
│   │   │   └── index.ts
│   │   └── screens/
│   │       ├── PlayingScreen.tsx     # Main game screen
│   │       ├── ReadyScreen.tsx      # Countdown screen
│   │       ├── WaitingScreen.tsx     # Matchmaking screen
│   │       ├── EndedScreen.tsx       # Results screen
│   │       └── IdleScreen.tsx        # Home screen
│   ├── hooks/
│   │   ├── useGameSocket.ts          # WebSocket connection
│   │   └── useTimer.ts              # Game timer
│   ├── constants/
│   │   └── index.ts                 # App configuration
│   └── types/
│       └── index.ts                 # TypeScript types
└── package.json
```

## Locked Components

The following components are **LOCKED** and should not be modified without explicit permission:

- `QuestionCard.tsx` - Keypad and question display
- `CircularTimer.tsx` - Timer component
- `PlayerCard.tsx` - User scorecards
- `PlayingScreen.tsx` - Main game layout

## Getting Started

### Prerequisites

- Node.js
- Bun
- Expo CLI
- For iOS: Xcode (Mac only)
- For Android: Android Studio

### Installation

```bash
cd apps/matiks-mobile
bun install
```

### Running Development Server

```bash
# Start Metro bundler
bunx expo start

# Then press:
# - 'i' for iOS simulator
# - 'a' for Android emulator
# - Scan QR code for physical device
```

### Running with Backend

Make sure the backend server is running:

```bash
cd apps/elixir
bun dev
```

The mobile app connects to `ws://YOUR_IP:3000/ws`. Update `WS_URL` in `src/constants/index.ts` for your environment.

## Game Flow

1. Enter name on home screen
2. Click "Find Match" to join matchmaking
3. Wait for opponent to join
4. 5-second countdown begins
5. 60-second game timer starts
6. Solve math problems using the keypad
7. Correct answers increase your score
8. Game ends, winner is announced
9. "Play Again" returns to matchmaking

## WebSocket Events

### Client → Server

| Event | Payload |
|-------|---------|
| `JOIN` | `{ type: 'JOIN', name: string }` |
| `UPDATE` | `{ type: 'UPDATE', gameId, user, isCorrect }` |

### Server → Client

| Event | Payload |
|-------|---------|
| `GAME_STARTED` | `{ type, gameId, user1, user2, questions, startingTime, endingTime }` |
| `SCORE_UPDATE` | `{ type, user1Points, user2Points }` |
| `GAME_OVER` | `{ type, user1Points, user2Points, winner }` |

## Configuration

Edit `src/constants/index.ts` to change:

- `API_BASE_URL` - Backend API URL
- `WS_URL` - WebSocket URL
- `GAME_DURATION_SECONDS` - Game duration (default: 60)
- `COUNTDOWN_SECONDS` - Countdown (default: 5)

## Build

### Android

```bash
bunx expo prebuild --platform android
bunx expo run:android
```

### iOS

```bash
bunx expo prebuild --platform ios
bunx expo run:ios
```

## License

Private - All rights reserved

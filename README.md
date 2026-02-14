# Matiks - Real-time Math Duel Game

A real-time multiplayer math game where two players compete to solve math problems as fast as possible.

## Project Overview

- **Type:** Real-time multiplayer web game
- **Players:** 2 players per match (1v1 duel)
- **Game:** Solve math problems (addition, subtraction, multiplication, division)
- **Duration:** 60 seconds per game

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Bun, Hono, WebSocket, Better Auth |
| Database | PostgreSQL with Drizzle ORM |
| Communication | JSON over WebSocket |

## Project Structure

```
matiks/
├── apps/
│   ├── matiks-web/          # Frontend (React + Vite)
│   │   └── src/
│   │       ├── components/    # UI components
│   │       │   ├── game/      # Game UI (timer, score, questions)
│   │       │   ├── screens/   # Screen components
│   │       │   └── ui/        # Base components (Button, Input, etc.)
│   │       ├── context/       # React Context (AuthContext)
│   │       ├── hooks/         # useGameSocket, useTimer
│   │       ├── lib/           # Auth client, utilities
│   │       ├── types/         # TypeScript interfaces
│   │       └── constants/    # Game config
│   │
│   └── elixir/               # Backend (Bun + Hono)
│       └── src/
│           ├── index.ts      # WebSocket server
│           ├── auth.ts       # Better Auth configuration
│           ├── db/           # Drizzle ORM setup & schema
│           ├── routes/       # API routes (auth endpoints)
│           ├── game/         # Game logic
│           └── Question/     # Question generation
│
└── packages/                 # Shared packages
```

## Getting Started

### Prerequisites
- Bun (for backend)
- Node.js (for frontend)
- PostgreSQL (for authentication database)

### Setup

1. **Configure environment:**
   ```bash
   cp apps/elixir/.env.example apps/elixir/.env
   # Edit .env with your database URL and auth secrets
   ```

2. **Set up database:**
   ```bash
   cd apps/elixir
   bun run db:push  # Create tables
   ```

### Run Development Servers

**Backend:**
```bash
cd apps/elixir
bun install
bun dev  # http://localhost:3000
```

**Frontend:**
```bash
cd apps/matiks-web
npm install
npm run dev  # http://localhost:5173
```

## Game Flow

1. Player signs up/logs in (email/password or Google)
2. Player enters name on landing screen
3. Connects to WebSocket server
4. Server matches with another player (or waits)
5. Both players receive `GAME_STARTED` with questions
6. 5-second countdown begins
7. 60-second game timer starts
8. Players type answers (only numbers accepted)
9. Correct answers increase score in real-time
10. Game ends, winner announced
11. "Play Again" returns to matchmaking

## WebSocket Events

### Client → Server

| Event | Payload |
|-------|---------|
| `JOIN` | `{ type: 'JOIN', name: string }` |
| `UPDATE` | `{ type: 'UPDATE', gameId, user, isCorrect }` |

### Server → Client

| Event | Payload |
|-------|---------|
| `waiting` | `{ type: 'waiting', message }` |
| `GAME_STARTED` | `{ type: 'GAME_STARTED', gameId, opponent, questions, ... }` |
| `SCORE_UPDATE` | `{ type: 'SCORE_UPDATE', player1Score, player2Score }` |
| `GAME_OVER` | `{ type: 'GAME_OVER', winner, scores }` |

## Game States

| State | Description |
|-------|-------------|
| `idle` | Player hasn't joined yet |
| `waiting` | Matchmaking - waiting for opponent |
| `ready` | Both players joined, countdown |
| `playing` | Game active |
| `ended` | Game over, showing results |

## Current Features

- Real-time 1v1 math duel
- User authentication (email/password + Google OAuth)
- Persistent user profiles
- Auto-matchmaking (pairs 2 players)
- 4 question types: +, −, ×, ÷
- 60-second timed games
- Real-time score updates
- Play again functionality

## Known Limitations

- Game state stored in-memory only (not persisted)
- No game history/stats tracking
- Single game mode only
- No lobby/room codes

## Future Enhancements

See GitHub Issues for planned features.

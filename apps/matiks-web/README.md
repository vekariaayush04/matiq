# Matiks - Real-time Math Duel Game

A real-time multiplayer math game where two players compete to solve math problems as fast as possible.

## Project Structure

```
matiks/
├── matiks-web/          # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Reusable base components
│   │   │   │   ├── index.ts
│   │   │   │   ├── Logo.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   └── AuthHeader.tsx
│   │   │   ├── game/       # Game-specific components
│   │   │   │   ├── index.ts
│   │   │   │   ├── CircularTimer.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── QuestionCard.tsx
│   │   │   │   └── ScoreBoard.tsx
│   │   │   └── screens/    # Full-screen views
│   │   │       ├── index.ts
│   │   │       ├── AuthScreen.tsx
│   │   │       ├── IdleScreen.tsx
│   │   │       ├── WaitingScreen.tsx
│   │   │       ├── ReadyScreen.tsx
│   │   │       ├── PlayingScreen.tsx
│   │   │       └── EndedScreen.tsx
│   │   ├── context/        # React Context
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── index.ts
│   │   │   ├── useGameSocket.ts
│   │   │   └── useTimer.ts
│   │   ├── lib/            # Auth client & utilities
│   │   │   └── auth.ts     # Better Auth client
│   │   ├── utils/         # Utility functions
│   │   │   └── index.ts
│   │   ├── types/         # TypeScript types
│   │   │   └── index.ts
│   │   ├── constants/     # Game constants
│   │   │   └── index.ts
│   │   ├── App.tsx       # Main application component
│   │   ├── main.tsx      # Entry point
│   │   └── index.css     # Global styles & Tailwind
│   ├── package.json
│   └── vite.config.ts
│
└── elixir/               # Backend (Hono + Bun + WebSocket)
    ├── src/
    │   ├── index.ts       # Main server entry point
    │   ├── auth.ts        # Better Auth configuration
    │   ├── db/            # Drizzle ORM
    │   ├── routes/        # Auth API routes
    │   ├── game/
    │   │   └── game.ts   # Game class with core logic
    │   ├── Question/
    │   │   └── question.ts  # Question generation
    │   └── enums/
    │       ├── eventNameTypes.ts
    │       └── gameStatus.ts
    └── package.json
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS v4
- **Backend:** Hono, Bun, WebSocket, Better Auth
- **Database:** PostgreSQL with Drizzle ORM
- **Communication:** JSON over WebSocket
- **Auth:** Email/password + Google OAuth

## Game Flow

```
1. Player signs up or logs in
2. Player enters display name
3. Connect to WebSocket server
4. Server matches two players (matchmaking)
5. Both players receive GAME_STARTED with questions
6. Countdown timer (5 seconds)
7. Game timer starts (60 seconds)
8. Players answer questions by typing the result
9. First to more correct answers wins
10. Game ends, show results
11. Click "Play Again" to restart
```

## Game States

| State | Description |
|-------|-------------|
| `idle` | Player hasn't joined yet |
| `waiting` | Waiting for opponent or game start |
| `playing` | Game is active |
| `ended` | Game over, showing results |

## Running the Project

### Prerequisites
- Node.js / Bun
- npm or bun package manager
- PostgreSQL (for authentication)

### Setup

1. **Configure backend environment:**
   ```bash
   cp ../elixir/.env.example ../elixir/.env
   # Edit .env with your database URL and auth secrets
   ```

2. **Set up database:**
   ```bash
   cd ../elixir
   bun install
   bun run db:push
   ```

### Backend (elixir)
```bash
cd apps/elixir
bun install
bun dev  # Runs on http://localhost:3000
```

### Frontend (matiks-web)
```bash
cd apps/matiks-web
npm install
npm run dev  # Runs on http://localhost:5173
```

## Key Files

### Frontend

**`context/AuthContext.tsx`**
- React context for authentication state
- Provides `useAuth` hook for session management
- Wraps app with AuthProvider

**`lib/auth.ts`**
- Better Auth client configuration
- Exports: `signIn`, `signUp`, `signOut`, `useSession`

**`components/screens/AuthScreen.tsx`**
- Login/signup screen
- Email/password and Google OAuth options

**`hooks/useGameSocket.ts`**
- Manages WebSocket connection and game state
- Exports: `connect`, `updateScore`, `disconnect`, `reset`
- Handles all WebSocket events (JOIN, GAME_STARTED, SCORE_UPDATE, GAME_OVER)

**`hooks/useTimer.ts`**
- Manages game timer and countdown
- Tracks game phases (waiting, playing, ended)
- Uses requestAnimationFrame for smooth updates

**`components/screens/`**
- `AuthScreen.tsx` - Login/signup screen
- `IdleScreen.tsx` - Entry screen with name input
- `WaitingScreen.tsx` - Matchmaking spinner
- `ReadyScreen.tsx` - Pre-game countdown with matchup
- `PlayingScreen.tsx` - Main game UI
- `EndedScreen.tsx` - Results screen

**`components/ui/AuthHeader.tsx`**
- Header component with user info and logout button

**`components/game/`**
- `CircularTimer.tsx` - SVG countdown ring
- `ProgressBar.tsx` - Question progress indicator
- `ScoreBoard.tsx` - Player scores display
- `QuestionCard.tsx` - Math problem with answer input

**`types/index.ts`**
- `GameState` - Complete game state interface
- `GameMessage` - Union type for all WebSocket messages
- `Question` - Question structure
- `GameStatus` / `GamePhase` - State types

**`constants/index.ts`**
- `GAME_DURATION_SECONDS` - 60s playtime
- `COUNTDOWN_SECONDS` - 5s countdown
- `ANSWER_DEBOUNCE_MS` - 150ms answer delay
- `SCORE_ANIMATION_MS` - 300ms score pulse

### Backend

**`game/game.ts`**
- `Game` class manages game lifecycle
- `startGame()` - Initializes game with countdown + playtime
- `updateScore()` - Increments score for correct answers
- `isGameOver()` - Checks if time has expired
- `broadcast()` - Sends messages to both players

**`index.ts`**
- WebSocket upgrade endpoint
- Matchmaking logic (creates game when 2 players join)
- Handles game events (JOIN, UPDATE)

## Adding New Features

### Adding a New Auth Provider

1. **Backend:** Add provider config in `auth.ts`
2. **Frontend:** Add provider button in `AuthScreen.tsx`

Example for adding GitHub OAuth:

```typescript
// Backend - apps/elixir/src/auth.ts
socialProviders: {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  },
}

// Frontend - AuthScreen.tsx
<button onClick={() => signIn('github')}>Sign in with GitHub</button>
```

### Adding a New Game Event

1. **Backend:** Define event type in `enums/eventNameTypes.ts`
2. **Frontend:** Add to `GameMessage` union type in `types/index.ts`
3. **Handle:** Add switch case in `hooks/useGameSocket.ts`
4. **UI:** Create component in `components/game/` if needed

### Modifying Game Duration

Edit `constants/index.ts`:
```typescript
export const GAME_DURATION_SECONDS = 60  // Playtime
export const COUNTDOWN_SECONDS = 5        // Pre-game countdown
```

### Adding New Question Types

1. **Backend:** Add operator to `types/operator.ts`
2. **Backend:** Update `Question/question.ts` generation logic
3. **Frontend:** Add to `utils/index.ts` operator mapping

### Creating a New Screen

1. Create component in `components/screens/`
2. Export from `components/screens/index.ts`
3. Add case in `App.tsx` switch statement

```tsx
// Example new screen
export const NewScreen = ({ onComplete }: NewScreenProps) => {
  return (
    <div className="min-h-screen ...">
      {/* content */}
    </div>
  )
}
```

## Code Style Guide

### Component Structure
```tsx
/**
 * Component Name
 * Brief description of what it does
 */

interface ComponentProps {
  /** Description of prop */
  propName: Type
}

/**
 * Main description
 */
export const Component = ({ propName }: ComponentProps) => {
  return <div>...</div>
}
```

### Hook Structure
```tsx
/**
 * Hook Name
 * Brief description of what it does
 */

interface HookReturn {
  /** Returned value */
  value: Type
}

export const useHook = (param: Type): HookReturn => {
  // Implementation
  return { value }
}
```

### Import Order
1. React imports
2. External libraries
3. Relative imports (hooks, components, utils, types, constants)

## Troubleshooting

- **Game not starting:** Check server is running on port 3000
- **WebSocket errors:** Check browser console for connection issues
- **Questions not loading:** Verify server can generate questions
- **Timer stuck:** Refresh page to reset state
- **Build errors:** Run `npm run build` to see TypeScript errors

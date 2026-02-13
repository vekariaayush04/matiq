# Matiks Backend (Elixir)

Real-time WebSocket server for the Matiks math duel game.

## Quick Start

```bash
bun install
bun dev  # Runs on http://localhost:3000
```

## Project Structure

```
src/
├── index.ts           # Main server entry, WebSocket handler
├── game/
│   └── game.ts        # Game class with core game logic
├── Question/
│   └── question.ts    # Question generation utilities
├── enums/
│   ├── eventNameTypes.ts  # WebSocket event types
│   └── gameStatus.ts      # Game status constants
└── types/
    └── operator.ts    # Operator types for questions
```

## Game Configuration

In `src/game/game.ts`:

```typescript
const start = new Date(now.getTime() + 5_000);   // 5 seconds countdown
const end = new Date(start.getTime() + 60_000);  // 60 seconds playtime
```

**Current Settings:**
- Countdown: 5 seconds after both players join
- Game duration: 60 seconds
- Questions: 40 math problems per game

## Matchmaking Flow

1. First player joins → creates `pendingGame`
2. Second player joins → pairs with pending player
3. Both players receive `GAME_STARTED` event
4. Countdown begins
5. Game timer starts

## WebSocket Events

### Incoming (from client)

| Type | Payload | Handler |
|------|---------|---------|
| `JOIN` | `{ type: 'JOIN', name: string }` | Matchmaking |
| `UPDATE` | `{ type: 'UPDATE', gameId, user, isCorrect }` | Score update |

### Outgoing (to client)

| Type | Payload |
|------|---------|
| `pairing`/`waiting` | Status messages |
| `GAME_STARTED` | Game config + questions |
| `SCORE_UPDATE` | Current scores |
| `GAME_OVER` | Final scores |

## Game Class

```typescript
class Game {
  gameId: string
  ws1: WSContext          // Player 1 socket
  ws2: WSContext | null   // Player 2 socket
  status: string          // PENDING, STARTED, ENDED
  user1: string
  user2: string | null
  user1Points: number
  user2Points: number
  questions: Question[]
  startingTime: Date | null
  endingTime: Date | null
}
```

## Adding Features

### New Event Type

1. Add to `src/enums/eventNameTypes.ts`
2. Handle in `src/index.ts` switch statement

### New Question Type

1. Add operator to `src/types/operator.ts`
2. Update `Question.generateQuestionData()` in `src/Question/question.ts`
3. Update frontend operator symbol mapping in `App.tsx`

## Notes

- Uses Bun as the runtime
- Hono framework for HTTP/WebSocket
- Auto-reload enabled in dev mode (`bun run --hot`)
- Games are stored in-memory and removed after completion

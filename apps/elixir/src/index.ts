import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { upgradeWebSocket, websocket } from 'hono/bun'
import {eventNameTypes} from "./enums/eventNameTypes";
import {Game} from "./game/game";

const app = new Hono()

//all middlewares
app.use(logger())
app.use('/api/v1/*', cors())

app.get('/health', (c) => {
  return c.json({
    status: 200,
    timestamp: new Date().toISOString(),
  })
})

let games: Game[] = []
let pendingGame: Game | null = null;

//ws conn
app.get(
    '/ws',
    upgradeWebSocket((c) => {
      return {
        onOpen(_, ws) {
          const id = crypto.randomUUID()
          console.log('Client connected')
        },

        onMessage(event, ws) {
          const data = JSON.parse(event.data.toString())

          switch (data.type) {
            case eventNameTypes.JOIN : {
              console.log(`Message from client: ${data}`)
              const game = pendingGame
              if(game) {
                ws.send('pairing with user: ' + game.user1)
                // @ts-ignore
                game.startGame(data.name, ws)
                games.push(game)
                pendingGame = null

                game.broadcast({
                  type: "GAME_STARTED",
                  gameId: game.gameId,
                  user1: game.user1,
                  user2: game.user2,
                  startingTime: game.startingTime,
                  endingTime: game.endingTime,
                  questions: game.questions
                });

              }else{
                ws.send('waiting for user to join ....')
                pendingGame = new Game(ws, data.name)
              }
              break
            }
            case eventNameTypes.UPDATE: {
              const { gameId, user, isCorrect } = data;

              const game = games.find(g => g.gameId === gameId);

              if (!game) {
                ws.send(JSON.stringify({ error: "Game not found" }));
                break;
              }

              if (game.isGameOver()) {
                game.status = "ENDED";

                game.broadcast({
                  type: "GAME_OVER",
                  user1Points: game.user1Points,
                  user2Points: game.user2Points
                });

                games = games.filter(g => g.gameId !== gameId);
                game.ws1.close(1000, "game closed");
                game.ws2?.close(1000, "game closed");
                break;
              }

              game.updateScore(user, isCorrect);


              game.broadcast({
                type: "SCORE_UPDATE",
                user1Points: game.user1Points,
                user2Points: game.user2Points
              });

              break;
            }

            case eventNameTypes.LEAVE : {
              console.log(`Message from client: ${data}`)
              ws.send('Hello from server!')
              break
            }
            default : {
              ws.close(1000, "wrong event type !!")
            }
          }

        },
        onClose: (e) => {
          console.log('Connection closed')
        },

      }
    })
)

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
  websocket
}

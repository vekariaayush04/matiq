import type { WSContext } from 'hono/ws'
import {gameStatus} from "../enums/gameStatus";
import {Question} from "../Question/question";

export class Game {
    gameId: string;
    ws1: WSContext;
    ws2: WSContext | null = null;

    status : string;
    user1 : string;
    user2 : string | null;
    user1Points : number;
    user2Points : number;
    questions : Question[] = [];
    startingTime : Date | null = null;
    endingTime : Date | null = null;

    constructor(ws: WSContext, user1: string) {
        this.gameId = crypto.randomUUID();
        this.ws1 = ws;
        this.status = gameStatus.PENDING;
        this.user1 = user1;
        this.user2 = null;
        this.user1Points = 0;
        this.user2Points = 0;

        this.generateQuestions();
    }


    public startGame(user2: string, ws2: WSContext) {
        this.user2 = user2;
        this.ws2 = ws2;
        this.status = gameStatus.STARTED;

        const now = new Date();
        const start = new Date(now.getTime() + 5_000);
        const end = new Date(start.getTime() + 60_000);

        this.startingTime = start;
        this.endingTime = end;
    }


    public updateScore(user: string, isCorrect: boolean) {
        if (!isCorrect) return;

        if (this.status !== gameStatus.STARTED) return;

        if (!this.endingTime) return;

        if (this.isGameOver()) {
            this.status = gameStatus.ENDED;
            return;
        }

        if (user === this.user1) {
            this.user1Points++;
        } else if (user === this.user2) {
            this.user2Points++;
        }
    }


    public generateQuestions() {
        for (let i = 0; i < 40; i++) {
            this.questions.push(Question.generateQuestionData())
        }
    }

    public isGameOver(): boolean {
        if (!this.endingTime) return false;
        return new Date() > this.endingTime;
    }

    public broadcast(payload: any) {
        const message = JSON.stringify(payload);

        this.ws1.send(message);
        if (this.ws2) {
            this.ws2.send(message);
        }
    }

}
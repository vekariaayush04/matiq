import { Operator } from "../types/operator";
import type { Operator as OperatorType } from "../types/operator";

export class Question {
    operator : OperatorType;
    operand1 : number;
    operand2 : number;
    answer : number;

    constructor(op : OperatorType, num1 : number, num2 : number) {
        this.operator = op;
        this.operand1 = num1;
        this.operand2 = num2;
        this.answer = this.performOperation(op)
    }

    private performOperation(operator : OperatorType) : number {
        switch (operator){
            case Operator.ADDITION : {
                return this.operand1 + this.operand2;
            }
            case Operator.SUBTRACTION : {
                return this.operand1 - this.operand2;
            }
            case Operator.MULTIPLICATION : {
                return this.operand1 * this.operand2;
            }
            // case Operator.DIVISION : {
            //     return this.operand1 / this.operand2;
            // }
        }
    }

    static generateQuestionData(): Question {
        const operators = Object.values(Operator);

        const randomOperator =
            operators[Math.floor(Math.random() * operators.length)];

        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;

        return new Question(randomOperator, num1, num2);
    }

}
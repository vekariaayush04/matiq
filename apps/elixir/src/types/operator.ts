export const Operator = {
    ADDITION: "ADDITION",
    SUBTRACTION: "SUBTRACTION",
    MULTIPLICATION: "MULTIPLICATION",
    // DIVISION: "DIVISION",
} as const

export type Operator = typeof Operator[keyof typeof Operator]

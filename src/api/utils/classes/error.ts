export interface CustomError extends Error {
    error: string;
}

export class ExpectedError extends Error {
    constructor(msg: string) {
        super(msg)

        this.msg = msg;

        Object.setPrototypeOf(this, ExpectedError.prototype);
    }

    msg: string;
}
import { CustomError } from './custom-error.js';
export class BabRequestError extends CustomError {
    statusCode = 400;
    message;
    constructor(messageIn) {
        super(messageIn);
        this.message = messageIn;
        Object.setPrototypeOf(this, BabRequestError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.message }
        ]
    }

}
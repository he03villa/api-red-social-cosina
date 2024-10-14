import { CustomError } from './custom-error.js';
export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    message;
    constructor(messageIn) {
        super(messageIn);
        this.message = messageIn;
      // only because we are extending a built in class
      Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors () {
      return [
        { message: this.message }
      ]
    }
}

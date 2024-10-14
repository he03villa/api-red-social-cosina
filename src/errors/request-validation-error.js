import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    errors;
    constructor (errorIn) {
      super('Invalido el parametro');
      this.errors = errorIn;
      Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors () {
      return this.errors.map(err => {
        const helper = err.msg.toString();
        return { message: helper, field: err.param }
      });
    }
}

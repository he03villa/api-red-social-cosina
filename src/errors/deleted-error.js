import { CustomError } from './custom-error'

export class DeletedError extends CustomError {
    statusCode = 410
    constructor () {
      super('Element was deleted')
      Object.setPrototypeOf(this, DeletedError.prototype)
    }

    serializeErrors () {
      return [{
        message: 'Element was deleted'
      }]
    }
}

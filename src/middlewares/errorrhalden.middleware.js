import { CustomError } from '../errors/custom-error.js';

export const errorHalden = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(400).send({ errors: [{ message: 'Algo salió mal' }] });
};
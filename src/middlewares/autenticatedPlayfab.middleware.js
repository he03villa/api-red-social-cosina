import { BabRequestError } from '../errors/bad-request-error.js';

export const ensureAuthPlayfab = (req, res, next) => {
    const autho = req.get('x-api-key');
    if (!autho) {
        throw new BabRequestError('La petición no tiene la cabecera de x-api-key');
    }
    next();
};
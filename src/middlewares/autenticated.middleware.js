import jwt from 'jwt-simple';
import { BabRequestError } from '../errors/bad-request-error.js';
import { NotAuthorizedError } from '../errors/not-authorized-error.js';
const secret = 'examen_app';

export const ensureAuth = (req, res, next) => {
    const autho = req.get('Authorization');
    if (!autho) {
        throw new NotAuthorizedError('La petición no tiene la cabecera de autenticación');
    }
    const token = autho.replace(/['"]+/g, '');
    try {
        const payload = jwt.decode(token, secret);
        req.user = payload;
    } catch (error) {
        throw new NotAuthorizedError('El token no es valido');
    }
    next();
};
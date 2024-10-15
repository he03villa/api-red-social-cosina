import jwt from 'jwt-simple';
import moment from 'moment';
const secret = 'examen_app';

export const createToken = (user) => {
    const payload = { ...user, exp: moment().add(1, 'days').unix() };
    return jwt.encode(payload, secret);
}
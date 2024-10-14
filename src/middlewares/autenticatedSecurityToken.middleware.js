
import { BabRequestError } from '../errors/bad-request-error.js';
import CryptoJS from 'crypto-js';

const secret = 'examen_app_umbra';

export const ensureAuthSegurityToken = (req, res, next) => {
    const autho = req.get('x-ummbra-security-token');
    if (!autho) {
        throw new BabRequestError('La petición no tiene la cabecera de x-ummbra-security-token');
    }
    const token = autho.replace(/['"]+/g, '');
    try {
        const key = CryptoJS.enc.Utf8.parse(secret);
        const decrypted = CryptoJS.AES.decrypt(token, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
          
        const dataDescryptada = decrypted.toString(CryptoJS.enc.Utf8);
        const dataJSON = JSON.parse(dataDescryptada);
        const payload = dataJSON.dataTran;
        req.compra = JSON.parse(payload);
    } catch (error) {
        console.log(error);
        throw new BabRequestError('El security no es valido');
    }
    next();
};
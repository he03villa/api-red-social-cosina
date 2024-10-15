import { body } from "express-validator";
import { serializeErrors } from "../services/error.service.js";
import UsuariosService from "../services/usuarios.service.js";
import { BabRequestError } from "../errors/bad-request-error.js";

const userService = new UsuariosService();
class UsuariosValidator {

    saveUsuario = [
        body("email").notEmpty().withMessage("El email del usuario es requerido").isEmail().withMessage("El Email no tiene el formato"),
        body("password").notEmpty().withMessage("El password del usuario es requerido"),
        body("username").notEmpty().withMessage("El username del usuario es requerido").custom((value, {req}) => {
            if (!/^[0-9a-zA-Z]+$/.test(value)) {
                throw new Error('El nombre de usuario no se permite de tener caracteres especiales');
            }
            return true; 
        })
    ];

    login = [
        body("email").notEmpty().withMessage("El email del usuario es requerido").isEmail().withMessage("El email no tiene el formato"),
        body("password").notEmpty().withMessage("El password del usuario es requerido")
    ];

    existeUser = async (req, res, next) => {
        const { email } = req.body;
        const user = await userService.getUser(email);
        //if (user != null) throw new BabRequestError(`El correo ${ email } ya existe`);
        if (user != null) serializeErrors(res, 400, `El correo ${ email } ya existe`);
        else next();
    };

    existeNoUser = async (req, res, next) => {
        const { email } = req.body;
        const user = await userService.getUser(email);
        if (user == null) serializeErrors(res, 400, `El correo ${ email } no existe`);
        else next();
    };

}

export default UsuariosValidator;
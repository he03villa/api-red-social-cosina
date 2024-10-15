import { Router } from "express";
import UsuariosController from "../controllers/usuarios.controller.js";
import UsuariosValidator from "../validators/usurios.validators.js";
import { validaRequest } from "../middlewares/validarrequest.middleware.js";

const usuariosRouter = Router();
const usuariosController = new UsuariosController();
const usuariosValidator = new UsuariosValidator();

/**
 * @swagger
 * /api/usuarios/create:
 *  post:
 *    description: Creacion de usuario
 *    tags:
 *      - Usuarios
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - password
 *              - email
 *              - username
 *            properties:
 *              password:
 *                type: string
 *                default: 123456789
 *              email:
 *                type: string
 *                default: prueba@prueba.com
 *              username:
 *                type: string
 *                default: prueba
 *    responses:
 *     201:
 *      description: creacion de usuario success
 *      examples:
 *        application/json: {
 *          "id": 1,
 *          "nombre": "juan",
 *          "numero_cedula": "12334345",
 *          "email": "prueba@prueba.com",
 *          "tipo_idenficacion": "CC",
 *          "createdAt": "2024-09-21T02:11:11.000Z",
 *          "updatedAt": "2024-09-21T02:11:11.000Z"
 *        }
 *     400:
 *       description: bad request
 *       schema:
 *          type: object
 *          properties:
 *            errors:
 *              type: object
 *       examples:
 *          application/json: {
 *            "errors": [
 *                 "message": "Incorrect password"
 *             ],
 *          }
 *
 */
usuariosRouter.post(
    "/create", 
    usuariosValidator.saveUsuario, 
    usuariosValidator.existeUser,
    validaRequest,
    usuariosController.create
);

/**
 * @swagger
 * /api/usuarios/login:
 *  post:
 *    description: Login user (client and producer)
 *    tags:
 *      - Usuarios
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: prueba@prueba.com
 *              password:
 *                type: string
 *                default: 123456789
 *    responses:
 *     200:
 *      description: login success
 *      examples:
 *        application/json: {
 *          "id": 1,
 *          "nombre": "juan",
 *          "numero_cedula": "12334345",
 *          "email": "prueba@prueba.com",
 *          "tipo_idenficacion": "CC",
 *          "createdAt": "2024-09-21T02:11:11.000Z",
 *          "updatedAt": "2024-09-21T02:11:11.000Z"
 *        }
 *     400:
 *       description: bad request
 *       schema:
 *          type: object
 *          properties:
 *            errors:
 *              type: object
 *       examples:
 *          application/json: {
 *            "errors": [
 *                 "message": "Incorrect password"
 *             ],
 *          }
 *
 */
usuariosRouter.post(
    "/login", 
    usuariosValidator.login, 
    usuariosController.login
);

export default usuariosRouter;
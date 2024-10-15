import { Router } from "express";
import UsuariosController from "../controllers/usuarios.controller.js";
import UsuariosValidator from "../validators/usurios.validators.js";
import { validaRequest } from "../middlewares/validarrequest.middleware.js";
import { ensureAuth } from "../middlewares/autenticated.middleware.js";

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

/**
 * @swagger
 * '/api/usuarios/update/{id}':
 *  put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *      - Usuarios
 *     summary: put a User
 *     parameters:
 *         - in: header
 *           name: x-Authorization
 *           type: string
 *           description: Token de autorizacion
 *           required: true
 *         - in: path
 *           name: id
 *           type: string
 *           description: El id del usuairo
 *           required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - nombre
 *              - telefono
 *            properties:
 *              nombre:
 *                type: string
 *                default: Juan
 *                required: true
 *              telefono:
 *                type: string
 *                default: 12334345
 *                required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Authentication Error
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
usuariosRouter.put(
    "/update/:id",
    usuariosValidator.updateUser,
    ensureAuth,
    validaRequest,
    usuariosController.updateUser
);

/**
 * @swagger
 * '/api/usuarios/updatePassword/{id}':
 *  put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *      - Usuarios
 *     summary: put a User
 *     parameters:
 *         - in: header
 *           name: x-Authorization
 *           type: string
 *           description: Token de autorizacion
 *           required: true
 *         - in: path
 *           name: id
 *           type: string
 *           description: El id del usuairo
 *           required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - password
 *            properties:
 *              password:
 *                type: string
 *                default: 123456788
 *                required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Authentication Error
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
usuariosRouter.put(
    "/updatePassword/:id",
    usuariosValidator.password,
    ensureAuth,
    validaRequest,
    usuariosController.updatePassword
);

export default usuariosRouter;
import { Router } from "express";
import PublicacionesValidator from "../validators/publicaciones.validators.js";
import PublicacionesController from "../controllers/publicaciones.controller.js";
import { validaRequest } from "../middlewares/validarrequest.middleware.js";
import { ensureAuth } from "../middlewares/autenticated.middleware.js";


const publicacionesRouter = Router();
const publicacionesController = new PublicacionesController();
const publicacionesValidator = new PublicacionesValidator();

/**
 * @swagger
 * '/api/publicaciones/create':
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *      - Publicaciones
 *     summary: put a User
 *     parameters:
 *         - in: header
 *           name: x-Authorization
 *           type: string
 *           description: Token de autorizacion
 *           required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - text
 *            properties:
 *              text:
 *                type: string
 *                default: Juan
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
publicacionesRouter.post(
    "/create", 
    publicacionesValidator.savePublicacion,
    ensureAuth,
    validaRequest,
    publicacionesController.createPublicacion
);

export default publicacionesRouter
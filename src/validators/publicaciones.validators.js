import { body } from "express-validator";
import { serializeErrors } from "../services/error.service.js";

class PublicacionesValidator {
    savePublicacion = [
        body("text").notEmpty().withMessage("El text de la publicacion es requerido")
    ];
}
export default PublicacionesValidator;
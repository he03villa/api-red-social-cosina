import { serializeErrors } from "../services/error.service.js";
import PublicacionesService from "../services/publicaciones.service.js";

const publicacionesService = new PublicacionesService(); 
class PublicacionesController {

    getPublicaciones = async (req, res) => {
        
    }

    /**
     * Crea un nuevo publicacion
     * @param {Object} req.body - Informaci n de la publicacion a crear
     * @param {string} req.body.text - texto de la publicacion
     * @returns {Object} - La publicacion creado
     */
    createPublicacion = async (req, res) => {
        try {
            const user = req.user;
            const { text, fotos } = req.body;
            const data = { texto: text, usuarios_id: user.id, tipo: 1, fotos };
            const publicacion = await publicacionesService.createPublicacion(data);
            if (publicacion.code == 201) {
                return res.status(publicacion.code).send(publicacion.data);
            } else {
                serializeErrors(res, publicacion.code, publicacion.data);
            }
        } catch (error) {
            return res.status(500).send({ message: 'Error Interno' });
        }
    }
}
export default PublicacionesController;
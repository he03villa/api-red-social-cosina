import Base from "../utils/_base.util.js";

class PublicacionesService extends Base {
    /**
     * Creates a new publicacion record in the database.
     * @param {Object} data - The data for the new publicacion.
     * @returns {Object} - An object containing the status code and the created publicacion data,
     * or an error message if the creation fails.
     */
    async createPublicacion(data) {
        try {
            const publicacion = await this.prisma.publicaciones.create({
                data
            });
            return { code: 201, data: publicacion };
        } catch (error) {
            console.log(error);
            return { code: 400, data: 'No se encontro  el usuario' };
        }
    }
}
export default PublicacionesService;
import Base from "../utils/_base.util.js";
import { uploadImage } from "./cloudinary.service.js";

class PublicacionesService extends Base {
    /**
     * Creates a new publicacion record in the database.
     * @param {Object} data - The data for the new publicacion.
     * @returns {Object} - An object containing the status code and the created publicacion data,
     * or an error message if the creation fails.
     */
    async createPublicacion(data) {
        const { fotos } = data;
        delete data.fotos;
        const images = [];
        try {
            const publicacion = await this.prisma.publicaciones.create({
                data
            });
            for (let x = 0; x < fotos.length; x++) {
                const element = fotos[x];
                const url = `${new Date().getTime()}`;
                const resul = await uploadImage(element, url);
                const dataImagen = {
                    url: resul.optimizeUrl,
                    public_id: resul.uploadResult.public_id,
                    format: resul.uploadResult.format,
                    resource_type: resul.uploadResult.resource_type,
                    publicaciones_id: publicacion.id
                };
                const image = await this.prisma.fotos.create({ data: dataImagen });
                images.push(image);
            }
            const dataPublic = { ...publicacion, images };
            return { code: 201, data: dataPublic };
        } catch (error) {
            console.log(error);
            return { code: 400, data: 'No se encontro  el usuario' };
        }
    }
}
export default PublicacionesService;
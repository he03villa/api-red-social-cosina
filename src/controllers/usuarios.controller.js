import { serializeErrors } from "../services/error.service.js";
import UsuariosService from "../services/usuarios.service.js";

const userService = new UsuariosService();
class UsuariosController {

    /**
     * Crea un nuevo usuario
     * @param {Object} req.body - Informaci n del usuario a crear
     * @param {string} req.body.password - Contrase a del usuario
     * @param {string} req.body.username - Nombre de usuario
     * @param {string} req.body.email - Correo electr nico
     * @returns {Object} - El usuario creado
     */
    async create(req, res) {
        const { password, username, email } = req.body;
        const data = {
            password,
            username,
            email
        }
        try {
            const newUser = await userService.saveUsuario(data);
            if (newUser.code == 201) {
                return res.status(201).send(newUser.data );
            } else {
                serializeErrors(res, newUser.code, newUser.data);
            }
        } catch (ex) {
            console.log(ex);
            return res.status(500).send({ message: 'Error Interno' });
        }
    }

    /**
     * Realiza el inicio de sesi n
     * @param {Object} req.body - Informaci n del usuario
     * @param {string} req.body.email - Correo electr nico
     * @param {string} req.body.password - Contrase a del usuario
     * @returns {Object} - El usuario logueado
     */
    async login(req, res) {
        const { email, password } = req.body;
        const data = {
            password,
            email
        }
        try {
            const user = await userService.login(data);
            if (user.code == 200) {
                return res.status(200).send(user.data);
            } else {
                serializeErrors(res, user.code, user.data);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error Interno' });
        }
    }

    updateUser = async (req, res) => {
        const { id } = req.params;
        const { nombre, telefono } = req.body;
        const data = { nombre, telefono: telefono.toString(), id }
        try {
            const user = await userService.updateUser(data);
            if (user.code == 200) {
                return res.status(200).send(user.data);
            } else {
                serializeErrors(res, user.code, user.data);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error Interno' });
        }
    }

    updatePassword = async (req, res) => {
        const { id } = req.params;
        const { password } = req.body;
        const data = { password, id }
        try {
            const user = await userService.updatePassword(data);
            if (user.code == 200) {
                return res.status(200).send(user.data);
            } else {
                serializeErrors(res, user.code, user.data);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error Interno' });
        }
    }

    searchUser = async (req, res) => {
        const search = req.query.search || '';
        try {
            const user = await userService.searchUser(search);
            if (user.code == 200) {
                return res.status(200).send(user.data);
            } else {
                serializeErrors(res, user.code, user.data);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error Interno' });
        }
    }
}
export default UsuariosController;
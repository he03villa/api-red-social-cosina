import Base from "../utils/_base.util.js";
import * as bcrypt from "bcrypt-nodejs";
import { createToken } from "./jws.service.js";

class UsuariosService extends Base {
    
    saveUsuario = async (option) => {
        try {
            const hash = await new Promise((resolve, reject) => {
                bcrypt.hash(option.password, null, null, (err, hash) => {
                    if (err) reject(err);
                    resolve(hash);
                });
            });
            const data = {
                password: hash,
                email: option.email,
                username: option.username
            };
            const newUser = await this.prisma.usuarios.create({ data });
            delete newUser.password;
            return { code: 201, data: newUser };
        } catch (ex) {
            return { code: 400, data: ex.message };
        }
    }

    getUser = async (option) => {
        const OR = [];
        if (typeof option == 'string') {
            OR.push({ email: option });
        } else if (typeof option == 'number') {
            OR.push({ id: option });
        }
        const user = await this.prisma.usuarios.findFirst({
            where: { OR },
        });
        return user;
    }

    login = async (option) => {
        const user = await this.getUser(option.email);
        if (user) {
            const match = await new Promise((resolve, reject) => {
                bcrypt.compare(option.password, user.password, (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                });
            });
            if (match) {
                delete user.password;
                user.token = createToken(user);
                return { code: 200, data: user };
            } else {
                return { code: 400, data: 'Contraseña incorrecta' };
            }
        } else {   
            return { code: 400, data: 'No se encontro el usuario' };
        }
    }
}

export default UsuariosService;
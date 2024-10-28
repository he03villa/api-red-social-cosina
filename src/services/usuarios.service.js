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
            newUser.token = createToken(newUser);
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
                return { code: 400, data: 'Contrase a incorrecta' };
            }
        } else {   
            return { code: 400, data: 'No se encontro  el usuario' };
        }
    }

    updateUser = async (option) => {
        try {
            const id = parseInt(option.id);
            delete option.id;
            const newUser = await this.prisma.usuarios.update({
                where: { id: id },
                data: option
            });
            return { code: 200, data: { message: "Se actualizo el usuario" } };
        } catch (error) {
            console.log(error);
            return { code: 400, data: 'No se encontro  el usuario' };
        }
    }

    updatePassword = async (option) => {
        try {
            const id = parseInt(option.id);
            const user = await this.getUser(id);
            const check = await new Promise((resolve, reject) => {
                bcrypt.compare(option.password.toString(), user.password, async (err, check) => {
                    if (err) reject(err);
                    resolve(check);
                });
            });
            if (check) return { code: 400, data: `La contraseña nueva es igual a la vieja` };
            const hash = await new Promise((resolve, reject) => {
                bcrypt.hash(option.password, null, null, (err, hash) => {
                    if (err) reject(err);
                    resolve(hash);
                });
            });
            const data = {
                password: hash,
                id: id
            }
            const result = await this.updateUser(data);
            return result;
        } catch (error) {
            return { code: 400, data: 'No se encontro  el usuario' };
        }
    }

    searchUser = async (option) => {
        try {
            const OR = [                
                { email: { contains: option } },
                { username: { contains: option } },
                { nombre: { contains: option } },
                { telefono: { contains: option } }
            ];
            const user = await this.prisma.usuarios.findMany({
                where: { OR },
                select: {
                    username: true,
                    nombre: true,
                    foto: true,
                },
                take: 10,
            });
            return { code: 200, data: user};
        } catch (error) {
            return { code: 400, data: error.message };
        }
    }
}

export default UsuariosService;
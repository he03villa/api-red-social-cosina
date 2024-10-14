import { validationResult } from "express-validator";

const serializeMensage = (errors) => {
    return errors.map(err => {
        const helper = err.msg.toString();
        return { message: helper, field: err.path }
      });
}

export const validaRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const { code } = req;
        return res.status(code ? code : 400).send({ errors: serializeMensage(errors.array()) });
    }
    next();
}

export const serializeErrors = (res, code, message) => {
    return res.status(code).send({ errors: [{
        message
    }]});
}
import * as jwt from "jsonwebtoken";

export const generateToken = async (payload: any, expiresIn: string) => {
    return jwt.sign(payload, process.env['JWT_SECRET_KEY'], {expiresIn});
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env['JWT_SECRET_KEY']);
    } catch (error) {
        console.error(error)
    }
}
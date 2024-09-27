import {hash, compare} from "bcrypt";
import {Response} from "express";

export const hashPassword = async (text: string = process.env['DEFAULT_PASSWORD_TEXT']) => {
    const salt = Number(process.env['DEFAULT_PASSWORD_SALT']);

    return hash(text, salt)
}

export const verifyPassword = async  (plain: string, hash: string) => {
    return await compare(plain, hash)
}

export const sendRequestError = async  (message: string, res: Response) => {
    return res.status(500).send({error: message})
}

export const now = () => {
    return new Date(Date.now());
}
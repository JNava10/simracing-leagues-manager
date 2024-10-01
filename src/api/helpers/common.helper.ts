import {hash, compare} from "bcrypt";
import {Response} from "express";
import { ErrorResponse, SuccessResponse } from "../utils/props/response.prop";

export const hashPassword = async (text: string = process.env['DEFAULT_PASSWORD_TEXT']) => {
    const salt = Number(process.env['DEFAULT_PASSWORD_SALT']);

    return hash(text, salt)
}

export const verifyPassword = async  (plain: string, hash: string) => {
    return await compare(plain, hash)
}

export const sendErrorResponse = async  ({data, error}: ErrorResponse, res: Response) => {
    return res.status(500).send({error, data})
}

export const sendSuccessResponse = ({data, msg, status = 200}: SuccessResponse, res: Response) => {
    return res.status(status).send({data, msg})
}

export const now = () => {
    return new Date(Date.now());
}


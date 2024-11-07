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

export const sendSuccessResponse = ({data, msg = '', status}: SuccessResponse, res: Response) => {
    console.log(status)
    return res.status(status || 200).send({data, msg})
}

export const now = () => {
    return new Date(Date.now());
}

// TODO: Arreglar para futuro uso.
export const lowerObjectKeys = (object: any) => {
    let key;
    let keys = Object.keys(object);
    let n = keys.length;
    const newObject = {};

    while (n--) {
        key = keys[n] as string;
        newObject[`${key.toLowerCase()}${key.slice(2)}`] = object[key];

        if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
            console.log('Recursivo', Array.isArray(object[key]), key, object[key]);
            lowerObjectKeys(object[key])
        }
    }

    return newObject;
}


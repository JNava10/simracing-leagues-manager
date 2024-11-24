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

export const sendErrorResponse =  ({data, error}: ErrorResponse, res: Response) => {
    return res.status(500).send({error, data})
}

export const sendSuccessResponse = ({data, msg = '', status}: SuccessResponse, res: Response) => {
    return res.status(status || 200).send({data, msg})
}

export const now = () => {
    return new Date(Date.now());
}

export const milisToLaptime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000); // 1 minuto = 60000 ms
    const seconds = Math.floor((ms % 60000) / 1000); // 1 segundo = 1000 ms
    const milliseconds = ms % 1000; // Resto de milesimas que sobran de los segundos.

    // Añadimos los ceros al principio en cada numero para que tenga el formato correcto.
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};


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

export const getNearestNumber = (elements: number[], num: number) => {
    return elements.reduce((previous, current) => {
        return Math.abs(current - num) < Math.abs(previous - num) ? current : previous
    });
}

export const roundTo = function(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
};

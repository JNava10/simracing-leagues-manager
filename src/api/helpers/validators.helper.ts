import {regexList} from "../utils/constants/regex.constants";
import {Request} from "express";

// Custom validators de express-validator //

export const isCustomEmail = (value: string) => {
    if (!regexList.email.test(value)) throw new Error();

    return true;
}

export const isNick = (value: string) => {
    if (!regexList.nick.test(value)) throw new Error();

    return true;
}

export const identifierExists = (value: string, {req}) => {
    const request = req as Request;

    if (!request.body['nickname'] && !request.body['email']) throw new Error();

    return true;

}

// Validators personalizados //

export const isValidNumber = (value: string) => {
    const number = Number(value);

    return number !== null && !isNaN(number) && value.length > 0;
}

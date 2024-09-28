import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const checkBodyFields = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (result.isEmpty()) next();

    const errors = Object.values(result.mapped());
    let errorMsg = "";

    for (const i in errors) {
        if (Number(i) == errors.length - 1) errorMsg += `${errors[i].msg}.`;
        else errorMsg += `${errors[i].msg}, `;
    }

    if (errors.length > 0) return res.status(400).json(`Invalid request body. (${errorMsg})`);
}
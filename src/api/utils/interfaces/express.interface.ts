import {Request, Response} from "express";
import {AccessPayload} from "./login.interface";
import {IncomingHttpHeaders} from "node:http";

export interface CustomRequest extends Request {
    user: AccessPayload
    headers: CustomHeaders
}

export interface CustomHeaders extends IncomingHttpHeaders {
    token: string | null
}

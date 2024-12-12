import {TokenType} from "../enum/global.enum";

export interface LoginData {
    email?: string
    nickname?: string
    password: string
}

export interface AccessPayload {
    nickname: string,
    email: string,
    id: number
}

export interface SocketPayload {
    type: TokenType
    user: AccessPayload;
}


export interface RefreshPayload {
    id: number
}
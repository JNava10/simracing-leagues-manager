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

export interface RefreshPayload {
    id: number
}
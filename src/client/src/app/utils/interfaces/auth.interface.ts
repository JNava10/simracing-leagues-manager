export interface LoginData {
  nickname?: string,
  email?: string
  password: string,
}

export interface LoggedData {
  apiKey?: string,
  socketKey?: string,
  success?: string
  id?: number
}

export interface AuthData {
  auth: boolean
}

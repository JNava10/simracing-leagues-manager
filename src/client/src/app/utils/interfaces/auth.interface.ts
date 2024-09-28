export interface LoginData {
  nickname?: string,
  email?: string
  password: string,
}

export interface LoggedData {
  token?: string,
  success?: string
}

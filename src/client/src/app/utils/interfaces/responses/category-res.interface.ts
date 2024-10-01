export interface SuccessResponse<T> {
  msg: string,
  data?: T,
  status: number
}

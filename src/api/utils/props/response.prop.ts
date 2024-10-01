// Propiedades para metodos referentes a las respuestas de la API //

/**
 * Propiedades para respuestas con exito
 */
export interface SuccessResponse {
    msg: string,
    data?: any,
    status: number
}

/**
 * Propiedades para respuestas sin exito
 */
export interface ErrorResponse {
    error: string,
    data?: any
}

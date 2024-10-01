export interface ResError {
  msg: string
}

// Propiedades para metodos referentes a las respuestas de la API //

/**
 * Propiedades para respuestas con exito
 */
export interface DefaultRes<T> {
  msg?: string,
  data?: T,
  error?: string
}


/**
 * Nivel de rendimiento del piloto, dependiendo de cuanto rendimiento se quiera simular
 */
export enum DrivingPerformance {
    Qualy = 99.5,
    Fast = 98.5,
    Neutral = 97,
    Managing = 95,
}

/**
 * Grados de agarre (grip) del asfalto, dependiendo de las condiciones que se quieran simular. (Sacados de Assetto Corsa)
 */
export enum TrackGrip {
    Dusty = 86,
    Green = 90,
    Slow = 96,
    Fast = 98,
    Optimum = 100,
}

/**
 * Tipos de token de autenticacion para la API
 */
export enum TokenType {
    Socket,
    Api
}

/**
 * Tipos de rooms de Socket.io
 * Cada valor contiene el prefix del tipo correspondiente.
*/
export enum RoomType {
    League = 'l',
    Championship = 'c',
    Other = ''
}

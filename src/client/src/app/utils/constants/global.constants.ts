import { SESSION_DURATION_TYPE } from "../enums/round.enum"
import { RoundDurationType } from "../interfaces/championship.interface"

/**
 * Parametro que se define en la URL cuando se quiere enviar el token.
 */
export const sendTokenParam = {
  sendToken: true
}

/**
 * Tipos disponibles al definir la duración de una ronda de campeonato.
 */
export const roundDurationTypes: RoundDurationType[] = [
  {
    type: SESSION_DURATION_TYPE.Lap,
    name: 'Vueltas'
  },
  {
    type: SESSION_DURATION_TYPE.Day,
    name: 'Dias'
  },
  {
    type: SESSION_DURATION_TYPE.Hour,
    name: 'Horas'
  },
  {
    type: SESSION_DURATION_TYPE.Minute,
    name: 'Minutos'
  },
]

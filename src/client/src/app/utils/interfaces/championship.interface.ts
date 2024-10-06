import { SESSION_DURATION_TYPE } from "../enums/round.enum"
import { ScoreSystem } from "./score.interface"
import { Track } from "./track.interface"

export interface ChampionshipCreation {
  id?: number,
  name: string,
  description?: string
  categoryIds?: number[]
  trackIds?: number[]
  leagueId: number
  presetId?: number // Id del preset que utiliza para definir el sistema de puntuación. (Solo si así lo ha elegido el usuario)
}

export interface ChampionshipRound {
  id?: number
  name?: string
  trackId?: number
  track?: Track
  length?: RoundLength
  customScoring?: ScoreSystem // Configuración personalizada del sistema de puntuación.
}

export interface RoundLength {
  value?: number
  type?: SESSION_DURATION_TYPE,
}

export interface RoundDurationType {
  type: SESSION_DURATION_TYPE,
  name: string
}

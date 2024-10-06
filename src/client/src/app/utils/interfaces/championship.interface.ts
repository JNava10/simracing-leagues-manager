import { SESSION_DURATION_TYPE } from "../enums/round.enum"
import { ScoreSystem } from "./score.interface"
import { Track, TrackLayout } from "./track.interface"

export interface ChampionshipCreation {
  id?: number,
  name?: string,
  description?: string
  categoryIds?: number[]
  calendar?: ChampionshipRound[],
  simulatorId?: number
  leagueId?: number
}

export interface ChampionshipRound {
  id?: number
  name?: string
  layoutId?: number
  layout?: TrackLayout
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

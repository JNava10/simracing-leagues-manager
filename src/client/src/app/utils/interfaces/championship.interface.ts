import { SESSION_DURATION_TYPE } from "../enums/round.enum"
import { ScoreSystem } from "./score.interface"

export interface ChampionshipCreation {
  id?: number,
  name: string,
  description?: string
  categoryIds?: number[]
  trackIds?: number[]
  leagueId: number
  presetId?: number // Id del preset que utiliza para definir el sistema de puntuación. (Solo si así lo ha elegido el usuario)
  scoreSystemId?: number // Id del sistema de puntuación predefinido que se ha seleccionado. (Solo si así lo ha elegido el usuario)
}

export interface ChampionshipRound {
  id?: number
  name?: string
  trackId?: number
  laps?: number
  customScoring?: ScoreSystem // Configuración personalizada del sistema de puntuación. Podria existir desde ninguna hasta todas las rondas definidas. (Solo si así lo ha elegido el usuario)
}

export interface RoundDurationType {
  type: SESSION_DURATION_TYPE,
  name: string
}

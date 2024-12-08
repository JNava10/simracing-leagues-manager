import { SESSION_DURATION_TYPE } from "../enums/round.enum"
import { Category } from "./category.interface"
import { ExtraScore, PositionScore, ScoreSystem } from "./score.interface"
import { SimulatorGame } from "./simulator.interface"
import { Track, TrackLayout } from "./track.interface"
import { User } from "./user.interface"
import {League} from "./league.interface";

export interface LeagueChampionship {
  id?: number,
  name?: string,
  description?: string
  categories?: Category[]
  categoryIds?: number[]
  calendar?: ChampionshipRound[]
  scoreSystem?: ScoreSystem
  teams?: Team[]
  users?: ChampionshipEntry[]
  simulatorId?: number
  simulator?: SimulatorGame
  leagueId?: number
  picUrl?: string
}

export interface LeagueEvent {
  id?: number,
  name?: string,
  description?: string
  categoryIds?: number[]
  calendar?: ChampionshipRound[]
  teams?: Team[]
  users?: ChampionshipEntry[]
  layout?: TrackLayout;
  layoutId?: number
  simulatorId?: number
  leagueId?: number
}

export interface ChampionshipRound {
  id?: number
  name?: string
  layoutId?: number
  layout?: TrackLayout
  length?: RoundLength
  duration?: number
  durationType?: SESSION_DURATION_TYPE
  customScoring?: ScoreSystem
}

export interface ChampionshipEntry {
  gameName?: string
  number?: number
  team?: Team
  user?: User
}

export interface RoundLength {
  value?: number
  type?: SESSION_DURATION_TYPE,
}

export interface RoundDurationType {
  type: SESSION_DURATION_TYPE,
  name: string
}

/// Equipos ///

export interface Team {
  id?: number;
  name?: string;
  hexColor?: string;
  carEntries?: number;
}

export interface ChampionshipPresetCreating {
  categoryIds?: number[]
  calendar?: ChampionshipRound[]
  scoreSystem?: ScoreSystem
  teams?: Team[]
}

export interface ChampionshipRoundCreating {
  name?: string,
  description?: string
  layoutId?: number
}

export interface ChampionshipPresetCreation {
  name?: string,
  description?: string
  categoryIds?: number[]
  scoreSystem?: ScoreSystem,
  calendar?: ChampionshipRoundCreating[]
  teams?: Team[]
}

/// Presets ///

export interface ChampionshipPreset {
  id: number;
  name: string;
  description: string;
  imgUrl: string | null;
  scoreSystemId: number;
  authorId: number;
  createdAt: string;
  author: User;
  simulator: SimulatorGame
  scoreSystem: ScoreSystem;
  calendar: TrackLayout[];
  teams: Team[];
}

interface PresetTeam {
  presetId: number
  teamId: number
  team: Team
}


interface PresetRound {
  layout: TrackLayout
}


interface LayoutDetails {
  parent: Track;
}

export interface GetChampProps {
  name?: boolean;
  description?: boolean;
  categoryIds?: boolean;
  calendar?: boolean;
  scoreSystem?: boolean;
  teams?: boolean;
  simulator?: boolean;
}

export interface EnterChampionship {
  number: number;
  team: number;
  gameName: string;
}

export interface Position {
  driver?: ChampionshipEntry;
  position?: number;
  driverId?: number;
  finishState: number;
}

export interface PositionFormItem {
  driverId: number;
  position: number
  finishState: number;
}

export interface IsMember {
  exists: boolean;
}

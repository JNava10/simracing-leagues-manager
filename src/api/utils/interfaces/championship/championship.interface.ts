import {ChampionshipEntry, Prisma, TrackLayout, User} from "@prisma/client"
import { CategoryData as Category } from "../category.interface"
import { ScoreSystem } from "../score.interface"

export interface ChampionshipData {
    id?: number,
    name: string,
    description?: string,
    calendar?: ChampionshipRound[],
    joinedAt?: Date,
    leagueId: number,
}

export interface ChampionshipCreation {
    id?: number,
    name?: string,
    description?: string
    categoryId?: number
    scoreSystemId?: number,
    scoreSystem?: ScoreSystem,
    simulatorId?: number
    calendar?: ChampionshipRoundCreating[]
    teams?: Team[]
    leagueId?: number
}

export interface PresetCreation {
    id?: number,
    name?: string,
    description?: string
    categoryIds?: number[]
    scoreSystem?: ScoreSystem,
    calendar?: ChampionshipRoundCreating[]
    teams?: Team[]
}


export interface ChampionshipPreset {
    id?: number,
    name?: string,
    description?: string
    categories?: Category[]
    scoreSystem?: ScoreSystem,
    author: User
    calendar?: ChampionshipRound[]
    teams?: Team[]
}

export interface ChampionshipRound {
    id?: number,
    name?: string,
    description?: string
    
    layoutId?: number
    championshipId?: number
}

export interface EnterChampionship {
  number: number;
  teamId: number;
  gameName: string;
}


export interface ChampionshipRoundCreating {
    name?: string,
    description?: string
    layoutId?: number
}

export interface Team {
    id?: number;
    name?: string;
    hexColor?: string;
    carEntries?: number;
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

export interface PositionCreation {
    driverId: number;
    finishState: number;
}

export interface LeagueEvent {
    id?: number,
    name?: string,
    description?: string
    categoryIds?: number[]
    layout?: TrackLayout
    teams?: Team[]
    users?: ChampionshipEntry[]
    simulatorId?: number
    leagueId?: number
}
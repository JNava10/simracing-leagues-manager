import { CategoryData as Category } from "./category.interface"
import { ScoreSystem } from "./score.interface"

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
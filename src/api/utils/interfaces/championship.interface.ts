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
    calendar?: ChampionshipRound[]
    teams?: Team[]
    leagueId?: number
}


export interface ChampionshipRound {
    id?: number,
    name?: string,
    description?: string
    
    layoutId?: number
    championshipId?: number
}

export interface Team {
    id?: number;
    name?: string;
    hexColor?: string;
    carEntries?: number;
}
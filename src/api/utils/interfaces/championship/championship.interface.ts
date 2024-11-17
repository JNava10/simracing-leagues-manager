import { CategoryData as Category } from "../category.interface"
import { ScoreSystem } from "../score.interface"
import {Layout} from "../layout.interface";
import {SimulatorGame} from "../simulator.interface";
import {League} from "../league.interface";
import {User} from "../user.interface";

export interface Championship {
    id?: number,
    name?: string,
    description?: string
    categoryIds?: number[]
    calendar?: ChampionshipRound[]
    scoreSystem?: ScoreSystem
    teams?: Team[]
    users?: ChampionshipEntry[]
    simulatorId?: number
    simulator?: SimulatorGame
    leagueId?: number
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

export interface LeagueEventCreation {
    id?: number,
    layoutId?: number,
    name?: string,
    description?: string
    categoryIds?: number[]
    layout?: Layout
    teams?: Team[]
    simulatorId?: number
    leagueId?: number
}

export interface LeagueEvent {
    id?: number;
    name?: string;
    description?: string;
    authorId?: number;
    layoutId?: number;
    simulatorId?: number;
    createdAt?: Date;

    author?: User;
    league?: League;
    simulator?: SimulatorGame;
    layout?: Layout;

    users: ChampionshipEntry[];
    eventTeams: EventTeam[];
}

export interface EventTeam {
    eventId: number;
    teamId: number;

    event: LeagueEvent;
    team: Team;
}


export interface ChampionshipEntry {
    id: number;
    championshipId: number;
    userId: number;
    gameName?: string;
    number?: number;
    teamId?: number;
    description?: string;
    layoutId: number;
    createdAt: Date;

    championship?: Championship;
    user?: User;
    eventChampionship?: LeagueEvent;
}

export interface LeagueChampionshipQuery {
    id: number;
    leagueId: number;
    name: string;
    authorId: number;
    description: string;
    simulatorId: number;
    createdAt: string;
    calendar: CalendarQuery[];
    simulator: SimulatorGame;
    author: User;
    league: League;
    teams: ChampionshipTeamQuery[];
}

interface CalendarQuery {
    id: number;
    championshipId: number;
    layoutId: number;
    name: string;
    description: string | null;
    createdAt: string;
    finished: boolean;
    layout: Layout;
}

interface ChampionshipTeamQuery {
    championshipId: number;
    teamId: number;
    team: Team;
}
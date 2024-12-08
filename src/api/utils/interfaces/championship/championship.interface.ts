import { CategoryData as Category } from "../category.interface"
import { ScoreSystem } from "../score.interface"
import {Layout} from "../layout.interface";
import {SimulatorGame} from "../simulator.interface";
import {League} from "../league.interface";
import {User} from "../user.interface";
import {CategoryQuery} from "../../../services/queries/category.query";

export interface Championship {
    id?: number,
    name?: string,
    description?: string
    categories?: Category[]
    calendar?: ChampionshipRound[]
    scoreSystem?: ScoreSystem
    teams?: Team[]
    users?: ChampionshipEntry[]
    simulatorId?: number
    picUrl?: string
    backgroundUrl?: string
    simulator?: SimulatorGame
    leagueId?: number
}

export interface ChampionshipCreation {
    id?: number,
    name?: string,
    description?: string
    categoryIds?: number[]
    scoreSystem?: ScoreSystem,
    simulatorId?: number
    picUrl?: string
    backgroundUrl?: string
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
    simulator?: SimulatorGame,
    calendar?: ChampionshipRound[]
    teams?: Team[]
}

export interface ChampionshipPresetQuery {
    id: number
    name: string
    description: string
    imgUrl: string
    scoreSystemId: number
    authorId: number
    createdAt: string
    author: User,
    scoreSystem: ScoreSystem
    categories: ChampCategoryQuery[]
    layouts: PresetLayout[]
    teams: PresetTeam[]
}

export interface PresetLayout {
    presetId: number
    layoutId: number
    layout: Layout
}

export interface PresetTeam {
    presetId: number
    teamId: number
    team: Team
}

export interface ChampionshipRound {
    id?: number,
    name?: string,
    description?: string
    finished?: boolean
    createdAt?: Date
    roundNum?: number
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
    picUrl?: string
    backgroundUrl?: string
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
    picUrl?: string
    backgroundUrl?: string
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
    teams: EventTeam[];
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
    categories: ChampCategoryQuery[];
    scoreSystem: ScoreSystem;
}

interface CalendarQuery {
    id: number;
    championshipId: number;
    layoutId: number;
    roundNum: number;
    name: string;
    description: string | null;
    createdAt: Date;
    finished: boolean;
    layout: Layout;
}

interface ChampionshipTeamQuery {
    championshipId: number;
    teamId: number;
    team: Team;
}

interface ChampCategoryQuery {
    championshipId: number;
    categoryId: number;
    categories: Category;
}
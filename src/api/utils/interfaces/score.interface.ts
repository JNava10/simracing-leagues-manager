import {ExtraScoreName} from "../constants/score.constants";

export interface ScoreSystem {
    id?: number
    name?: string;
    description?: string;
    positions?: PositionScore[],
    extra?: ExtraScore[]
}

export interface PositionScore {
    score: number,
    parentId?: number
}

export interface ExtraScore {
    key?: ExtraScoreName,
    score: string,
    parentId?: number,
    extraId?: number,
    name?: string
}
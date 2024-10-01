import {ExtraScoreName} from "../constants/score.constants";

export interface ScoreSystem {
    name?: string;
    description?: string;
    positions?: PositionScore[],
    extra?: ExtraScore[]
}

export interface PositionScore {
    position: string,
    score: string,
    parentId?: number
}

export interface ExtraScore {
    key?: ExtraScoreName,
    score: string,
    parentId?: number,
    extraId?: number,
    name?: string
}
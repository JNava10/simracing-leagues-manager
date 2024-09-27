import {ExtraScoreName} from "../constants/score.constants";

export interface ScoreSystemSeed {
    name: string;
    description: string;
    positions: PositionScoreSeed[],
    extra?: ExtraScoreSeed[]
}

export interface PositionScoreSeed {
    position: string,
    score: string,
    parentId?: number
}

export interface ExtraScoreSeed {
    key: ExtraScoreName,
    score: string,
    parentId?: number,
    extraId?: number
}
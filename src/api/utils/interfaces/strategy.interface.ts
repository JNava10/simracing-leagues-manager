import {Track} from "./track.interface";
import {TrackLayout} from "@prisma/client";
import {Layout} from "./layout.interface";

export interface BaselineCar {
    id?: number;
    name?: string;
    description?: string;
    fuelWasteKm?: number;
    engine?: string;
    weightKg?: number;
    fuelCapacityLitre?: number;
    powerHp?: number;
    tyres?: Tyre[];
}

export interface Tyre {
    id?: number;
    name?: string;
    description?: string;
    color?: string;
    hardness?: number;
    carId?: number;
    car?: BaselineCar;
    wearList?: TyreWear[]
}


export interface TyreWear {
    tyreId?: number;
    wearIndex?: number;
    performance?: number;
}

export interface Strategy  {
    laps: StrategyLap[];
    overall: StrategyOverall
}

export interface StrategyOverall {
    raceTime?: number;
    raceLaps?: number;
    pitStopCount?: number;
}

export interface StrategyLap {
    raceLap?: number;
    stintLap?: number;
    tyreId?: number;
    wearInfo?: TyreWearInfo
    lapTime?: number;
    lapTimeFormatted?: string;
}

export interface TyreWearInfo {
    wearIndex?: number;
    performance?: number;
}

export interface CreateStrategyProps {
    raceLength: number,
    trackLayout: Layout,
    car: BaselineCar,
    startFuel?: number,
    estimatedLapTimes: EstimatedLapTime[]
    tyres: number[]
}


export interface CreateStrategyRequest {
    raceLength: number,
    layoutId: number,
    carId: number,
    startFuel?: number,
    tyres: number[]
    estimatedLapTimes: EstimatedLapTime[]
}


export interface EstimatedLapTime {
    tyreId?: number;
    lapTimeMilis?: number;
}

export interface Stint {
    laps?: number;
    number?: number;
}
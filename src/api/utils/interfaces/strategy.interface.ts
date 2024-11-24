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

export interface StrategyLap {
    raceLap?: number;
    stintLap?: number;
    tyreId?: number;
    wearIndex?: number;
    lapTime?: number;
}

export interface CreateStrategyProps {
    raceLength: number,
    trackLayout: Layout,
    car: BaselineCar,
    startFuel?: number,
    estimatedLapTimes: EstimatedLapTime[]
}


export interface EstimatedLapTime {
    tyreId?: number;
    lapTimeMilis?: number;
}
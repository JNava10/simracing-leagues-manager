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
    lap: number;
    tyreId?: number;
    tyreWear?: string;
    lapSecs?: number;
    hasPitted: boolean;
}

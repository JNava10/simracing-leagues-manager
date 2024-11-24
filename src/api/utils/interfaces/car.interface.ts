export interface BaselineCar {
    id?: number;
    name?: string;
    description?: string;
    fuelWasteKm?: number;
    startYear?: number;
    endYear?: number;
    engine?: string;
    weightKg?: number;
    fuelCapacityLitre?: number;
    powerHp?: number;
    tyres?: StrategyTyre[];
}

export interface StrategyTyre {
    id?: number;
    name?: string;
    grip?: number;
    description?: string;
    color?: string;
    hardness?: number;
    carId?: number;
    car?: BaselineCar;
    wearList?: StrategyTyreWear[]
}

export interface Tyre extends StrategyTyre {
    wearIndex: number;
    performance: number;
    stint: number;
}


export interface StrategyTyreWear {
    tyreId?: number;
    wearIndex?: number;
    performance?: number;
}

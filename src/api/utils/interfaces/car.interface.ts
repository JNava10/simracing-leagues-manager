interface BaselineCar {
    id: number;
    name: string;
    description: string;
    fuelWasteKm: number;
    engine: string;
    weightKg: number;
    fuelCapacityLitre: number;
    powerHp?: number;
    tyres: Tyre[];
}

interface Tyre {
    id: number;
    name: string;
    description?: string;
    hardness: number;
    carId?: number;
    car?: BaselineCar;
}


interface TyreWear {
    tyreId: number;
    wearIndex: number;
    performance: number;
}

import {Track} from "../utils/interfaces/track.interface";

export const carSeedList: BaselineCar[] = [
    {
        id: 1,
        name: "F1 hibridos con concepto de 2009 (2014-2016)",
        description: "Coche de Fórmula 1 basado en el reglamento técnico híbrido inicial (2014-2016). Motor V6 turbo híbrido con limitaciones de flujo de combustible.",
        fuelWasteKm: 1.8,
        engine: "1.6L V6 Turbo Híbrido",
        weightKg: 702,
        fuelCapacityLitre: 100,
        tyres: [
            {
                id: 1,
                name: "Soft",
                hardness: 0.25,
            },
            {
                id: 2,
                name: "Medium",
                hardness: 0.5,
            },
            {
                id: 3,
                name: "Hard",
                hardness: 0.7,
            },
        ]
    },
    {
        id: 2,
        name: "F1 de efecto suelo (2022-2026)",
        description: "Coche de Fórmula 1 basado en el reglamento de efecto suelo que comenzó en 2022. Diseñado para reducir la pérdida aerodinámica y promover el espectáculo.",
        fuelWasteKm: 1.5,
        engine: "1.6L V6 Turbo Hibridos",
        weightKg: 798,
        fuelCapacityLitre: 110,
        tyres: [
            {
                id: 1,
                name: "C0",
                hardness: 1,
            },
            {
                id: 1,
                name: "C1",
                hardness: 0.85,
            },
            {
                id: 2,
                name: "C2",
                hardness: 0.70,
            },
            {
                id: 3,
                name: "C3",
                hardness: 0.50,
            },
            {
                id: 3,
                name: "C4",
                hardness: 0.35,
            },
            {
                id: 3,
                name: "C5",
                hardness: 0.15,
            },
        ]
    }
];

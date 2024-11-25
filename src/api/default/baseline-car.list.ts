import {Track} from "../utils/interfaces/track.interface";
import {BaselineCar} from "../utils/interfaces/car.interface";

export const carSeedList: BaselineCar[] = [
    {
        name: "F1 hibrida de efecto suelo (2022-2025)",
        description: "Coche de Fórmula 1 basado en el reglamento de efecto suelo que comenzó en 2022. Diseñado para reducir la pérdida aerodinámica y promover el espectáculo.",
        fuelWasteKm: 0.349,
        engine: "1.6L V6 Turbo Hibridos",
        powerHp: 1022,
        weightKg: 798,
        fuelCapacityLitre: 110,
        tyres: [
            {
                id: 1,
                color: "#e1e1e3",
                name: "C1",
                hardness: 0.85,
                wearList: [
                    {
                        wearIndex: 0,
                        performance: 100,
                    },
                    {
                        wearIndex: 2.6,
                        performance: 98.5,
                    },
                    {
                        wearIndex: 5.2,
                        performance: 96,
                    },
                    {
                        wearIndex: 7.8,
                        performance: 92,
                    },
                    {
                        wearIndex: 10.4,
                        performance: 88,
                    },
                    {
                        wearIndex: 13,
                        performance: 85,
                    },
                    {
                        wearIndex: 15.6,
                        performance: 83,
                    },
                    {
                        wearIndex: 18.2,
                        performance: 78,
                    },
                    {
                        wearIndex: 20.8,
                        performance: 73,
                    },
                    {
                        wearIndex: 23.4,
                        performance: 72,
                    },
                    {
                        wearIndex: 26,
                        performance: 70.4,
                    },
                    {
                        wearIndex: 28.6,
                        performance: 67.5,
                    },
                    {
                        wearIndex: 31.2,
                        performance: 65,
                    },
                    {
                        wearIndex: 33.8,
                        performance: 62,
                    },
                    {
                        wearIndex: 36.4,
                        performance: 59.5,
                    },
                    {
                        wearIndex: 39,
                        performance: 57,
                    },
                    {
                        wearIndex: 41.6,
                        performance: 54.5,
                    },
                    {
                        wearIndex: 44.2,
                        performance: 51,
                    },
                    {
                        wearIndex: 46.8,
                        performance: 49,
                    },
                    {
                        wearIndex: 49.4,
                        performance: 47,
                    },
                    {
                        wearIndex: 52,
                        performance: 45,
                    },
                ]
            },
            {
                id: 2,
                color: "#8a8624",
                name: "C2",
                hardness: 0.70,
                wearList: [
                    {
                        wearIndex: 0,
                        performance: 100,
                    },
                    {
                        wearIndex: 2.2,
                        performance: 98.5,
                    },
                    {
                        wearIndex: 4.4,
                        performance: 96,
                    },
                    {
                        wearIndex: 6.6,
                        performance: 92,
                    },
                    {
                        wearIndex: 8.8,
                        performance: 88,
                    },
                    {
                        wearIndex: 11,
                        performance: 85,
                    },
                    {
                        wearIndex: 13.2,
                        performance: 83,
                    },
                    {
                        wearIndex: 15.4,
                        performance: 78,
                    },
                    {
                        wearIndex: 17.6,
                        performance: 73,
                    },
                    {
                        wearIndex: 19.8,
                        performance: 72,
                    },
                    {
                        wearIndex: 22,
                        performance: 70.4,
                    },
                ]
            },
            {
                id: 3,
                color: "#d8c739",
                name: "C3",
                hardness: 0.50,
                wearList: [
                    {
                        wearIndex: 0,
                        performance: 100,
                    },
                    {
                        wearIndex: 2.2,
                        performance: 98.5,
                    },
                    {
                        wearIndex: 4.4,
                        performance: 96,
                    },
                    {
                        wearIndex: 6.6,
                        performance: 92,
                    },
                    {
                        wearIndex: 8.8,
                        performance: 88,
                    },
                    {
                        wearIndex: 11,
                        performance: 85,
                    },
                    {
                        wearIndex: 13.2,
                        performance: 83,
                    },
                    {
                        wearIndex: 15.4,
                        performance: 78,
                    },
                    {
                        wearIndex: 17.6,
                        performance: 73,
                    },
                    {
                        wearIndex: 19.8,
                        performance: 72,
                    },
                    {
                        wearIndex: 22,
                        performance: 70.4,
                    },
                    {
                        wearIndex: 24.2,
                        performance: 67.5,
                    },
                    {
                        wearIndex: 26.4,
                        performance: 65,
                    },
                    {
                        wearIndex: 28.6,
                        performance: 62,
                    },
                    {
                        wearIndex: 30.8,
                        performance: 59.5,
                    },
                    {
                        wearIndex: 33,
                        performance: 57,
                    },
                    {
                        wearIndex: 35.2,
                        performance: 54.5,
                    },
                    {
                        wearIndex: 37.4,
                        performance: 51,
                    },
                    {
                        wearIndex: 39.6,
                        performance: 49,
                    },
                    {
                        wearIndex: 41.8,
                        performance: 47,
                    },
                    {
                        wearIndex: 44,
                        performance: 45,
                    },
                ]
            },
            {
                id: 4,
                name: "C4",
                color: "#db222b",
                hardness: 0.35,
            },
            {
                id: 3,
                name: "C5",
                hardness: 0.15,
            },
        ],
    }
];

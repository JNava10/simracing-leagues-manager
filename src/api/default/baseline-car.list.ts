import {Track} from "../utils/interfaces/track.interface";
import {BaselineCar} from "../utils/interfaces/car.interface";

export const carSeedList: BaselineCar[] = [
    {
        name: "F1 hibridos con concepto de 2009 (2014-2016)",
        description: "Coche de Fórmula 1 basado en el reglamento técnico híbrido inicial (2014-2016). Motor V6 turbo híbrido con limitaciones de flujo de combustible.",
        fuelWasteKm: 0.56,
        engine: "1.6L V6 Turbo Híbrido",
        weightKg: 702,
        powerHp: 980,
        fuelCapacityLitre: 110,
        tyres: [
            {
                name: "Soft (Rear)",
                hardness: 0.25,
                color: "#db222b",
                wearList: [
                    {
                        wearIndex: 0,
                        performance: 99.5,
                    },
                    {
                        wearIndex: 0.57,
                        performance: 100,
                    },
                    {
                        wearIndex: 0.76,
                        performance: 100,
                    },
                    {
                        wearIndex: 3.8,
                        performance: 96,
                    },
                    {
                        wearIndex: 7.6,
                        performance: 94,
                    },
                    {
                        wearIndex: 15.2,
                        performance: 92,
                    },
                    {
                        wearIndex: 20.9,
                        performance: 80,
                    },
                    {
                        wearIndex: 22.8,
                        performance: 77,
                    }
                ]
            },
            {
                name: "Medium (Rear)",
                hardness: 0.5,
                color: "#d8c739",
                wearList: [
                    {
                        wearIndex: 0,
                        performance: 99.5,
                    },
                    {
                        wearIndex: 0.19,
                        performance: 99,
                    },
                    {
                        wearIndex: 0.38,
                        performance: 100,
                    },
                    {
                        wearIndex: 0.95,
                        performance: 100,
                    },
                    {
                        wearIndex: 6.46,
                        performance: 96,
                    },
                    {
                        wearIndex: 13.3,
                        performance: 90,
                    },
                    {
                        wearIndex: 20.9,
                        performance: 88,
                    },
                    {
                        wearIndex: 22.8,
                        performance: 85,
                    }
                ]
            },
            {
                id: 3,
                name: "Hard",
                color: "#e1e1e3",
                wearList: [
                    {
                        wearIndex: 0,
                        performance: 99,
                    },
                    {
                        wearIndex: 0.38,
                        performance: 100,
                    },
                    {
                        wearIndex: 0.95,
                        performance: 100,
                    },
                    {
                        wearIndex: 9.5,
                        performance: 97,
                    },
                    {
                        wearIndex: 17.1,
                        performance: 90,
                    },
                    {
                        wearIndex: 28.5,
                        performance: 88,
                    },
                    {
                        wearIndex: 38,
                        performance: 86,
                    }
                ],
                hardness: 0.7,
            },
        ],
    },
    // {
    //     name: "F1 hibrida de efecto suelo (2022-2025)",
    //     description: "Coche de Fórmula 1 basado en el reglamento de efecto suelo que comenzó en 2022. Diseñado para reducir la pérdida aerodinámica y promover el espectáculo.",
    //     fuelWasteKm: 0.349,
    //     engine: "1.6L V6 Turbo Hibridos",
    //     powerHp: 1022,
    //     weightKg: 798,
    //     fuelCapacityLitre: 110,
    //     tyres: [
    //         {
    //             id: 1,
    //             name: "C0",
    //             hardness: 1,
    //         },
    //         {
    //             id: 1,
    //             name: "C1",
    //             hardness: 0.85,
    //         },
    //         {
    //             id: 2,
    //             name: "C2",
    //             hardness: 0.70,
    //         },
    //         {
    //             id: 3,
    //             name: "C3",
    //             hardness: 0.50,
    //         },
    //         {
    //             id: 3,
    //             name: "C4",
    //             hardness: 0.35,
    //         },
    //         {
    //             id: 3,
    //             name: "C5",
    //             hardness: 0.15,
    //         },
    //     ],
    //     wearList: [
    //         {
    //             wearIndex: 0,
    //             performance: 99.5,
    //         },
    //         {
    //             wearIndex: 0.57,
    //             performance: 100,
    //         },
    //         {
    //             wearIndex: 0.76,
    //             performance: 100,
    //         },
    //         {
    //             wearIndex: 7.7,
    //             performance: 97,
    //         },
    //         {
    //             wearIndex: 13.4,
    //             performance: 93,
    //         },
    //         {
    //             wearIndex: 20.9,
    //             performance: 88,
    //         },
    //         {
    //             wearIndex: 21.7,
    //             performance: 86,
    //         },
    //         {
    //             wearIndex: 22.6,
    //             performance: 82,
    //         },
    //         {
    //             wearIndex: 23.5,
    //             performance: 75,
    //         },
    //         {
    //             wearIndex: 25.3,
    //             performance: 73,
    //         },
    //         {
    //             wearIndex: 27.8,
    //             performance: 70,
    //         },
    //     ]
    // }
];

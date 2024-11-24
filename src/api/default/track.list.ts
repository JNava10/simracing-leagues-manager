import {Track} from "../utils/interfaces/track.interface";

export const trackSeedList: Track[] = [
    {
        "name": "Silverstone Circuit",
        "description": "Circuit británico famoso por F1 y GT",
        "country": "GBR",
        "location": "Northamptonshire",
        "layouts": [
            {
                "name": "Grand Prix",
                "description": "Configuración tradicional de GP",
                "lengthKm": 5.891,
                "traction": 3,
                "braking": 3,
                "lateral": 5,
                "tyreStress": 4
            }
        ]
    },
    {
        "name": "Circuit de Spa-Francorchamps",
        "description": "Circuit belga famoso por F1 y WEC",
        "country": "BEL",
        "location": "Francorchamps",
        "layouts": [
            {
                "name": "Grand Prix",
                "description": "Configuración completa del circuito",
                "lengthKm": 7.004,
                "traction": 2,
                "braking": 4,
                "lateral": 4,
                "tyreStress": 5
            },
        ]
    },
    {
        "name": "Monza Circuit",
        "description": "Circuit italiano famoso por F1",
        "country": "ITA",
        "location": "Monza",
        "layouts": [
            {
                "name": "Grand Prix",
                "description": "Configuración tradicional de GP",
                "lengthKm": 5.793,
                "traction": 5,
                "braking": 5,
                "lateral": 3,
                "tyreStress": 3
            },
        ]
    },
    {
        "name": "Suzuka Circuit",
        "description": "Circuit japonés famoso por F1 y Super GT",
        "country": "JPN",
        "location": "Suzuka",
        "layouts": [
            {
                "name": "Grand Prix",
                "description": "Configuración tradicional de GP",
                "lengthKm": 5.807,
                "traction": 3,
                "braking": 4,
                "lateral": 5,
                "tyreStress": 5
            },
        ]
    },
    {
        "name": "Sebring International Raceway",
        "description": "Circuit estadounidense famoso por endurance",
        "country": "USA",
        "location": "Sebring, Florida",
        "layouts": [
            {
                "name": "Original",
                "description": "Configuración original del circuito",
                "lengthKm": 6.021,
                "traction": 2,
                "braking": 3,
                "lateral": 4,
                "tyreStress": 4
            }
        ]
    },
];

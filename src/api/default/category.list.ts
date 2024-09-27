import {CategoryData, CategorySeed} from "../utils/interfaces/category.interface";

export const categorySeed: CategorySeed[] = [
    {
        name: "Formula 1",
        description: "",
        subcategories: [
            {
                name: "F1 2021",
                description: "La temporada 2021 de Fórmula 1 fue una de las más emocionantes en la historia reciente, con una intensa batalla por el campeonato entre Lewis Hamilton y Max Verstappen."
            },
            {
                name: "F1 2007",
                description: "La temporada 2007 de Fórmula 1 fue notable por el dramático final donde Kimi Räikkönen ganó el campeonato en la última carrera, superando a Lewis Hamilton y Fernando Alonso."
            },
            {
                name: "F1 1994",
                description: "La temporada 1994 de Fórmula 1 estuvo marcada por la trágica muerte de Ayrton Senna y la controvertida victoria de Michael Schumacher en el campeonato."
            }
        ]
    }
];

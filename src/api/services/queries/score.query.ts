import {League} from "../../utils/interfaces/league.interface";
import {prisma} from "../../app";
import { ScoreSystem } from "../../utils/interfaces/score.interface";

export class ScoreQuery {
    static getAllScoreSystems = async () => {
        try {
            return await prisma.scoreSystem.findMany();
        } catch (e) {
            console.error(e.message);
        }
    };

    static createScoreSystem = async (scoreSystem: ScoreSystem) => {
        
        // Inserción del sistema de puntuacion
        const scoreSystemCreated = await prisma.scoreSystem.create({
            // @ts-ignore
            data: {}
        });

        // Inserción de las puntuaciones de posiciones (si existen)
        if (scoreSystem.positions && scoreSystem.positions.length > 0) {
            for (const position of scoreSystem.positions) {
                await prisma.scoreSystemPosition.create({
                    data: {
                        parentId: scoreSystemCreated.id,
                        score: position.score
                    }
                });
            }
        }

        return scoreSystemCreated.id
    } 
}

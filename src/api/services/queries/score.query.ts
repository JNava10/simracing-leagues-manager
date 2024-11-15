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
                    // @ts-ignore
                    data: {
                        parentId: scoreSystemCreated.id,
                        score: position.score
                    }
                });
            }
        }

        
        // Inserción de las puntuaciones de posiciones (si existen)
        if (scoreSystem.extra && scoreSystem.extra.length > 0) {
            for (const position of scoreSystem.extra) {
                await prisma.scoreSystemExtra.create({
                    // @ts-ignore
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

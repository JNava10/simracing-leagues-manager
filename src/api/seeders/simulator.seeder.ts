import {userSeedList} from "../default/user.list";
import {Seeder} from "../utils/abstract/seeder";
import {hashPassword} from "../helpers/common.helper";
import {prisma} from "../app";
import {categorySeed} from "../default/category.list";
import { simulatorSeed } from "../default/simulator.list";

export class SimulatorSeeder implements Seeder {
    run = async () => {
       try {
           for (let i in simulatorSeed) {
            await prisma.simulatorGame.create({
                data: {
                    name: simulatorSeed[i].name,
                    description: simulatorSeed[i].description,
                    releaseYear: simulatorSeed[i].releaseYear,
                }
            })
           }

       } catch (e) {
           console.error(e)
       } finally {
           await prisma.$disconnect()
       }
    };
}
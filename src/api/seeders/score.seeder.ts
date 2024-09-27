import {userSeedList} from "../default/user.list";
import {Seeder} from "../utils/abstract/seeder";
import {hashPassword} from "../helpers/common.helper";
import {prisma} from "../app";
import {trackSeedList} from "../default/track.list";
import {scoreSeedList} from "../default/score.list";
import {ExtraScoreName} from "../utils/constants/score.constants";

export class ScoreSeeder implements Seeder {
    run = async () => {
       try {
           const seedList = {...scoreSeedList}
           const extras  = Object.keys(ExtraScoreName);

           for (let i in extras) {
               // TODO: Mejorar este loop, buscando solo los valores del enum que se necesitan.
               // Ya que al coger las keys, tambien se cogen los indices de cada valor.
               if (!Number(extras[i])) await prisma.extraScore.create({data: {name: extras[i]}})
           }

           for (let i in seedList) {
               let scoreSystem = seedList[i];
               const createdSystem = await prisma.scoreSystem.create(
                   {
                       data: {
                           name: scoreSystem.name,
                           description: scoreSystem.description
                       }
                   }
               )

               for (let j in scoreSystem.positions) {
                   scoreSystem.positions[j].parentId = createdSystem.id;

                   // @ts-ignore
                   await prisma.scoreSystemPosition.create({data: scoreSystem.positions[j]})
               }

               for (let j in scoreSystem.extra) {
                   const extraName = ExtraScoreName[scoreSystem.extra[j].key]
                   const extra = await prisma.extraScore.findFirst({where: {name: extraName}})

                   scoreSystem.extra[j].parentId = createdSystem.id;
                   scoreSystem.extra[j].extraId = extra.id;

                   await prisma.scoreSystemExtra.create(
                       {
                           data: {
                               score:  scoreSystem.extra[j].score,
                               extraId: extra.id,
                               parentId: createdSystem.id
                           }
                       })
               }
           }
       } catch (e) {
           console.error(e)
       } finally {
           await prisma.$disconnect()
       }
    };
}

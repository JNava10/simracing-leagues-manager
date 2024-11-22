import {Seeder} from "../utils/abstract/seeder";
import {hashPassword} from "../helpers/common.helper";
import {prisma} from "../app";
import {trackSeedList} from "../default/track.list";
import {carSeedList} from "../default/baseline-car.list";

export class CarSeeder implements Seeder {
    run = async () => {
       try {
           const seedList = {...carSeedList}

           for (let i in seedList) {
               const {
                    name,
                   description,
                   powerHp,
                   engine,
                   tyres,
                   fuelCapacityLitre,
                   weightKg,
                   fuelWasteKm
               } = seedList[i];


               const createdCar = await prisma.baselineCar.create(
                   {
                       data: {
                           name,
                           description,
                           engine,
                           powerHp,
                           fuelWasteKm,
                           weightKg,
                           fuelCapacityLitre
                       }
                   }
               )

               for (let j in tyres) {
                   const {
                       name,
                       description,
                       color,
                       wearList,
                       hardness,
                       carId
                   } = tyres[j];

                   // @ts-ignore
                   const tyre = await prisma.tyre.create(
                       {
                           // @ts-ignore
                           data: {
                               name,
                               description,
                               hardness,
                               color,
                               carId: createdCar.id
                           }
                       });

                   for (let k in wearList) {
                       const {
                           wearIndex,
                           performance
                       } = wearList[k];

                       await prisma.tyreWear.create({
                          data: {
                              performance,
                              wearIndex,
                              tyreId: tyre.id
                          }
                       });
                   }
               }
           }

       } catch (e) {
           console.error(e)
       } finally {
           await prisma.$disconnect()
       }
    };
}

import {Seeder} from "../utils/abstract/seeder";
import {hashPassword} from "../helpers/common.helper";
import {prisma} from "../app";
import {trackSeedList} from "../default/track.list";

export class TrackSeeder implements Seeder {
    run = async () => {
       try {
           const seedList = {...trackSeedList}

           for (let i in seedList) {
               let track = seedList[i];
               const createdTrack = await prisma.track.create(
                   {
                       data: {
                           name: track.name,
                           description: track.description,
                           country: track.country,
                           location: track.location
                       }
                   }
               )

               for (let j in track.layouts) {
                   track.layouts[j].parentId = createdTrack.id;

                   // @ts-ignore
                   await prisma.trackLayout.create({data: track.layouts[j]})
               }
           }

       } catch (e) {
           console.error(e)
       } finally {
           await prisma.$disconnect()
       }
    };
}

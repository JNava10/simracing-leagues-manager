import {userSeedList} from "../default/user.list";
import {Seeder} from "../utils/abstract/seeder";
import {hashPassword} from "../helpers/common.helper";
import {prisma} from "../app";
import {categorySeed} from "../default/category.list";

export class CategorySeeder implements Seeder {
    run = async () => {
       try {
           const seedList = {...categorySeed}

           for (let i in seedList) {
               const createdCategory = await prisma.category.create({
                   data: {
                       name: seedList[i].name,
                       description: seedList[i].description
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
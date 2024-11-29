import {customUserSeedList, userSeedList} from "../default/user.list";
import {Seeder} from "../utils/abstract/seeder";
import {hashPassword} from "../helpers/common.helper";
import {prisma} from "../app";
import {UserQuery} from "../services/queries/user.query";

export class UserSeeder implements Seeder {
    run = async () => {
       try {
           const users = [
               ...userSeedList,
               ...customUserSeedList
           ];

           for (let i in users) {
               users[i].password = await hashPassword(process.env['DEFAULT_PASSWORD_TEXT']);

               await UserQuery.createUser(users[i]);
           }

       } catch (e) {
           console.error(e)
       } finally {
           await prisma.$disconnect()
       }
    };
}
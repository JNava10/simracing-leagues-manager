import { User } from "../utils/interfaces/user.interface";
import { hashPassword } from "../helpers/common.helper";
import {prisma} from "../app";

export class UserService {

    static createUser = async ({ name, lastname, secondLastname, password, nickname }: User) => {
        try {
            if (!password) password = await hashPassword(process.env['DEFAULT_PASSWORD_TEXT']);

            return prisma.user.create({
                data: {
                    name,
                    nickname,
                    lastname,
                    secondLastname,
                    password,
                    email: null
                },
            });
        } catch (err) {
            console.error(err)
            return null
        }
    };

    getUserByNickname = async (nickname: string) => prisma.user.findFirst({where: {nickname}});

    getUserByEmail = async (email: string) => prisma.user.findFirst({where: {email}});

    static userIdExists = async (userId: number) => {
        return prisma.user.findUnique({where: {id: userId}}) !== null;
    } 
}

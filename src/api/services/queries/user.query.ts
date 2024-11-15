import { User } from "../../utils/interfaces/user.interface";
import { hashPassword } from "../../helpers/common.helper";
import {prisma} from "../../app";

export class UserQuery {

    static createUser = async ({ name, lastname, secondLastname, password, nickname }: User) => {
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
    };

    getUserByNickname = async (nickname: string) => prisma.user.findFirst({where: {nickname}});

    getUserByEmail = async (email: string) => prisma.user.findFirst({where: {email}});

    static userIdExists = async (userId: number) => {
        return prisma.user.findUnique({where: {id: userId}}) !== null;
    }

    static searchByNick = async (search: string) => {
        return prisma.user.findMany({where: {nickname: {startsWith: search}}});
    }
}

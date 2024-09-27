export interface User {
    id?: number;
    nickname: string;
    name: string;
    lastname: string;
    secondLastname: string;
    password?: string;
    joinedAt?: Date;
    email?: string
}

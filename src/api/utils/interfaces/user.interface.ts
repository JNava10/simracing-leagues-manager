export interface User extends UserDataQuery {
    isYou?: boolean;
}

export interface UserDataQuery {
    id?: number;
    nickname?: string;
    name?: string;
    lastname?: string;
    secondLastname?: string;
    password?: string;
    createdAt?: Date;
    email?: string;
    profilePicUrl?: string;
}

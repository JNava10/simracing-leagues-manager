export interface User extends UserDataQuery {
    isYou?: boolean;
}

export interface UserDataQuery {
    id?: number;
    nickname?: string;
    name?: string;
    lastnames?: string;
    password?: string;
    createdAt?: Date;
    email?: string;
    profileUrl?: string;
}

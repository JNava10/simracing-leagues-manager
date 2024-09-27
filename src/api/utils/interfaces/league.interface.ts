export interface LeagueData {
    id?: number;
    name: string;
    description?: string;
    joinedAt?: Date;
}

export interface NewLeagueMember {
    userId: number;
}

export interface IsMemberAdded {
    executed: boolean,
    msg: string
}

export interface KickMember {
    userId: number
}
  
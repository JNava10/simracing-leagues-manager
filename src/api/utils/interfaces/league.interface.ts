export interface League {
    id?: number;
    name: string;
    description?: string;
    color?: string;
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

export interface LeagueBan {
    leagueId: number;
    userId: number;
    bannedAt: Date;
    reason: string;
}

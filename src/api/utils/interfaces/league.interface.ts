import {User} from "@prisma/client";

export interface League {
    id?: number;
    name: string;
    description?: string;
    color?: string;
    picUrl?: string;
    bannerUrl?: string;
}

export interface NewLeagueMember {
    userId: number;
}

export interface LeagueInvite {
    league: League;
    invitedAt: Date
}

export interface LeagueMemberQuery {
    leagueId?: number;
    userId?: number;
    notificationId?: number | null;
    accepted?: boolean;
    invited?: boolean;
    joinedAt?: Date | null;
    invitedAt?: Date;
    requestedAt?: Date | null;

    league?: League; // Relación con el modelo League
    user?: User;     // Relación con el modelo User
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

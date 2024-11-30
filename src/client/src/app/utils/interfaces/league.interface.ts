import { User } from "./user.interface";

export interface League {
  id?: number;
  name: string;
  description?: string;
  color?: string;
  picUrl?: string;
  bannerUrl?: string;
}
export interface LeagueMember {
  user: User
  joinedAt: Date
}

export interface LeagueRole {
  id: number,
  name: string
}

export interface LeagueInvite {
  league: League;
  invitedAt: Date
}

export interface LeagueMemberRequest {
  userId: number,
  leagueId: number
}

export interface BanMemberRequest {
  userId: number
  leagueId: number
  reason: string
}

export interface QueryIsExecuted {
  executed: boolean,
  msg: string
}

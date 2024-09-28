import { User } from "./user.interface";

export interface League {
  id?: number,
  name: string,
  description?: string
}

export interface LeagueMember {
  user: User
  joinedAt: Date
}

export interface LeagueRole {
  id: number,
  name: string
}

export interface ApiMemberFilter {
  userId: number,
  leagueId: number
}

export interface QueryIsExecuted {
  executed: boolean,
  msg: string
}

export interface User {
  id?: number;
  nickname: string;
  name: string;
  lastname: string;
  secondLastname: string;
  leagueJoinedAt?: Date;
  createdAt?: Date;
  email?: string
  isYou?: boolean;
}

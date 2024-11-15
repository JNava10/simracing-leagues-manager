import {League} from "./league.interface";

export interface Notification {
  origin: number
  createdAt: Date
  read: boolean
}

export interface InviteNotification extends Notification {
  league: League
}

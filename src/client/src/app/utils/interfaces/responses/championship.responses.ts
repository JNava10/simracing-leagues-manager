import { Team } from "../championship.interface"

export interface GetTeam {
  championshipId: number
  teamId: number
  team: Team
}

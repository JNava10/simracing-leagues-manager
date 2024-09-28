export interface ChampionshipCreation {
  id?: number,
  name: string,
  description?: string
  categoryId?: number
  scoreSystemId?: number,
  calendarIds?: number[]
  leagueId: number
}

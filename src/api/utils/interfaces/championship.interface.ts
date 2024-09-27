export interface ChampionshipData {
    id?: number,
    name: string,
    description?: string,
    calendar?: ChampionshipRound[],
    joinedAt?: Date,
    leagueId: number,
}

export interface ChampionshipCreation {
    id?: number,
    name: string,
    description?: string
    categoryId?: number
    scoreSystemId?: number,
    calendarIds?: number[]
    leagueId: number
}


export interface ChampionshipRound {
    id?: number,
    name?: string,
    description?: string
    trackId?: number
    championshipId?: number
}

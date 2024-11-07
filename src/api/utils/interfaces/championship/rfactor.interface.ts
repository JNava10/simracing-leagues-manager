export interface Driver {
    Name: string
    isPlayer: number
    GridPos: number
    Position: number
    FinishStatus: string
}

export interface RfactorData {
    rFactorXML: {
        RaceResults: {
            Race: {
                Driver: Driver[],
            }
        }
    }
}
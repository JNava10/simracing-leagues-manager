export interface ScoreSystem {
  id?: number,
  name: string,
  description?: string
  positions: PositionScore[]
  extra: ExtraScore[]
}

export interface PositionScore {
  position: string,
  score: string,
  parentId?: number
}

export interface ExtraScore {
  extraId?: number
  score?: string,
  parentId?: number,
  key?: number,
  name?: string
}

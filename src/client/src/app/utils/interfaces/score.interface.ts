export interface ScoreSystem {
  id?: number,
  name?: string,
  description?: string
  positions?: PositionScore[]
  extra?: ExtraScore[]
}

export interface PositionScore {
  score?: number,
  parentId?: number
}

export interface ExtraScore {
  extraId?: number
  score?: string,
  parentId?: number,
  key?: number,
  name?: string
}

export interface Track {
  id?: number
  name?: string
  shortName?: string
  description?: string
  country?: string
  location?: string
  layouts?: TrackLayout[]
}

export interface TrackLayout {
  id?: number
  name: string;
  description?: string;
  parentId?: number

  traction?: number;
  braking?: number;
  lateral?: number;
  tyreStress?: number;

  /** Propiedad temporal que indica el circuito al que pertenece.
   *
   */
  parent?: Track
}

export interface SearchTrackProps {
  id?: number;
  name?: string;
  country?: string
}

export interface SearchLayoutProps {
  id?: number;
  name?: string;
  country?: string
}

export interface SearchLayoutProps {
  id?: number;
  name?: string;
  country?: string
}

export interface StrategyTrack extends TrackLayout {
  layouts?: StrategyLayout[]
}


export interface StrategyLayout extends TrackLayout {
  traction: number;
  braking: number;
  lateral: number;
  tyreStress: number;
}

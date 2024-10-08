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

  /** Propiedad temporal que indica el circuito al que pertenece.
   *
   */
  track?: Track
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


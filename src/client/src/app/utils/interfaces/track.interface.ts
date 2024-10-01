export interface Track {
  id?: number,
  name: string,
  description: string
  country: string,
  location: string,
}

export interface SearchTrackProps {
  id?: number;
  name?: string;
  country?: string
}

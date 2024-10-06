import {Layout} from "./layout.interface";

export interface Track {
    name: string;
    description: string;
    country: string;
    location: string;
    layouts: Layout[];
}

export interface SearchTrackProps {
    id?: number;
    name?: string;
    country?: string
  }

export interface SearchTrackLayoutProps {
    id?: number;
    name?: string;
    country?: string,
}
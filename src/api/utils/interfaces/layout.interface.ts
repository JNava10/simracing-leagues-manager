export interface Layout {
    id?: number
    name?: string;
    description?: string;
    parentId?: number
    lengthKm: number;
    traction: number;
    braking: number;
    lateral: number;
    tyreStress: number;
}

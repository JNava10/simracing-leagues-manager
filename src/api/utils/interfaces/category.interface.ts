export interface CategoryData {
    id?: number;
    name: string;
    description: string;
}

export interface CategorySeed {
    name: string;
    description: string;
    subcategories: SubcategorySeed[]
}

export interface SubcategorySeed {
    name: string;
    description: string;
}

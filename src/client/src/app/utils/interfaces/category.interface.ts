export interface Category {
  id?: number,
  name: string,
  description?: string
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id?: number,
  name: string,
  description?: string
}

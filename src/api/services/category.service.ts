import {prisma} from "../app";

export class CategoryService {
    static getAllCategories = async (withSubcategories: boolean) => {
        const args = withSubcategories ? {include: {subcategories: true}} : undefined;

        return prisma.category.findMany(args);
    };
}

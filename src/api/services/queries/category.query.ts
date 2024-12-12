import {prisma} from "../../app";
import { SearchCategoryProps } from "../../utils/props/category.prop";

export class CategoryQuery {
    /**
     * Numero maximo de registros que devolverá la API al buscar.
     */
    private static maxCategorySearch = 5

    static getAll = async () => {
        return prisma.category.findMany();
    };

    static search = async ({name, id}: SearchCategoryProps) => {
        return prisma.category.findMany({
            where: {
                OR: [
                    {name: {startsWith: name}},
                    {id},
                ]

            }, take: this.maxCategorySearch});
    };
}

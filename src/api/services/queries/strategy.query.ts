import {prisma} from "../../app";
import { SimulatorSearchProps } from "../../utils/props/simulator.prop";
import {tr} from "@faker-js/faker";

export class StrategyQuery {

    static getAllCars = async () => {
        return prisma.baselineCar.findMany({
            include: {
                tyres: {
                    include: {wearList: true}
                }
            }
        });
    };

    static searchCarsByName = async (name: string) => {
        return prisma.baselineCar.findMany({
            where: {name: {contains: name}},
            include: {
                tyres: {
                    include: {wearList: true}
                }
            }
        });
    };
}

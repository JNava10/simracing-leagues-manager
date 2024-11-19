import {Request, Response} from "express";
import {UserQuery} from "../services/queries/user.query";
import { SimulatorGame } from "../utils/interfaces/simulator.interface";
import { SimulatorQuery } from "../services/queries/simulator.query";
import { SimulatorSearchProps } from "../utils/props/simulator.prop";
import { sendSuccessResponse } from "../helpers/common.helper";
import { Messages } from "../utils/enum/messages.enum";

export class SimulatorController {
    search = async (req: Request, res: Response) => {
        try {
            const body = req.query as SimulatorSearchProps;
            
            const simulators = await SimulatorQuery.search(body);
    
            sendSuccessResponse({
                msg: Messages.searchSims,
                data: simulators,
                status: 200
            }, res)
        } catch (error) {
            console.error(error);
        }
    }
}
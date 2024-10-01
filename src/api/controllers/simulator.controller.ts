import {Request, Response} from "express";
import {UserService} from "../services/user.service";
import { SimulatorGame } from "../utils/interfaces/simulator.interface";
import { SimulatorService } from "../services/simulator.service";
import { SimulatorSearchProps } from "../utils/props/simulator.prop";
import { sendSuccessResponse } from "../helpers/common.helper";
import { Messages } from "../utils/enum/messages.enum";

export class SimulatorController {
    search = async (req: Request, res: Response) => {
        try {
            const body = req.query as SimulatorSearchProps;
            
            const simulators = await SimulatorService.search(body);
    
            sendSuccessResponse({
                msg: Messages.SEARCH_SIMS,
                data: simulators,
                status: 200
            }, res)
        } catch (error) {
            console.error(error);
        }
    }
}
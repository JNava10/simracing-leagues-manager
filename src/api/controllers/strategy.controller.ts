import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserQuery} from "../services/queries/user.query";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {Notification} from "../utils/interfaces/notification.interface";
import {CarSeeder} from "../seeders/car.seeder";
import {carSeedList} from "../default/baseline-car.list";
import {trackSeedList} from "../default/track.list";
import {StrategyService} from "../services/strategy.service";

export class StrategyController {
    static getStrategies = async (req: Request, res: Response): Promise<void> => {
        try {
            const laps = 50;
            const strategyService = new StrategyService({
                raceLength: laps,
                car: carSeedList[0],
                trackLayout: trackSeedList[0].layouts[0],
                estimatedLapTimes: [
                    {lapTimeMilis: 93021, tyreId: 3},
                    {lapTimeMilis: 93843, tyreId: 2},
                    {lapTimeMilis: 94731, tyreId: 1},
                ],
                tyres: [1, 3, 3]
            });

            const strategy = strategyService.sim();

            sendSuccessResponse(
                {
                    data: [strategy],
                    status: 201,
                    msg: "Usuario creado correctamente.",
                },
                res
            );
        } catch (error) {
            console.error(error);
            
            sendErrorResponse({
                error: `Ha ocurrido un error al crear el usuario: ${error}`
            }, res)
        }
    };
}

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
import {StrategyQuery} from "../services/queries/strategy.query";
import {Messages} from "../utils/enum/messages.enum";
import {SearchCarProps, SearchCategoryProps} from "../utils/props/category.prop";
import {CreateStrategyRequest} from "../utils/interfaces/strategy.interface";
import {TrackQuery} from "../services/queries/track.query";
import {BaselineCar} from "../utils/interfaces/car.interface";

export class StrategyController {
    static getStrategies = async (req: Request, res: Response): Promise<void> => {
        try {
            const {
                carId,
                layoutId,
                tyres,
                startFuel,
                raceLength
            } = req.body as CreateStrategyRequest

            const trackLayout = await TrackQuery.getById(layoutId);
            const car = await StrategyQuery.getCarByIdFull(carId) as BaselineCar;
            const strategyService = new StrategyService({
                raceLength,
                car,
                trackLayout,
                estimatedLapTimes: [
                    {lapTimeMilis: 93021, tyreId: tyres[0]},
                    {lapTimeMilis: 93843, tyreId: tyres[1]},
                    {lapTimeMilis: 94731, tyreId: tyres[2]},
                ],
                tyres,
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

    static getBaselineCars = async (req: Request, res: Response): Promise<void> => {
        try {

            const props = req.query as SearchCarProps;

            const cars = await StrategyQuery.searchCarsByName(props.name);

            sendSuccessResponse(
                {
                    data: cars,
                    status: 200,
                    msg: Messages.searchSuccess,
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

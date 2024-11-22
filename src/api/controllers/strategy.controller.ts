import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserQuery} from "../services/queries/user.query";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {Notification} from "../utils/interfaces/notification.interface";
import {CreateStrategyProps} from "../utils/props/strategy.prop";
import {CarSeeder} from "../seeders/car.seeder";
import {carSeedList} from "../default/baseline-car.list";
import {trackSeedList} from "../default/track.list";
import {StrategyLap} from "../utils/interfaces/strategy.interface";
import {BaselineCar} from "../utils/interfaces/car.interface";
import {Track} from "../utils/interfaces/track.interface";

export class StrategyController {
    static getStrategies = async (req: Request, res: Response): Promise<void> => {
        try {
            const laps = 15;

            const strategy = StrategyController.simulateStrategy({
                lapsNum: laps,
                car: carSeedList[0],
                track: trackSeedList[0]
            })

            sendSuccessResponse(
                {
                    data: strategy,
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

    private static simulateStrategy = ({
        lapsNum,
        car,
        track,

    }: CreateStrategyProps
    ) => {
        const strategy: StrategyLap[] = [];

        for (let i = 0; i < lapsNum; i++) {
            StrategyController.simulateLap(car, track);
        }
    }

    private static simulateLap = (car: BaselineCar, track: Track) => {
        car.
    }
}

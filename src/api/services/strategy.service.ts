import {StrategyLap} from "../utils/interfaces/strategy.interface";
import {CreateStrategyProps} from "../utils/props/strategy.prop";
import {Track} from "../utils/interfaces/track.interface";
import {BaselineCar} from "../utils/interfaces/car.interface";

export class StrategyService {
    private track: Track;
    constructor(
        {track, lapsNum, car}: CreateStrategyProps
    ) {
        this.car = car;
        this.track = track;
        this.lapsNum = lapsNum;
    }

    private lapsNum: number;
    private car: BaselineCar;

    laps: StrategyLap[]

    simulateLap = () => {
        const car = this.car;
        const track = this.track;



    }

}
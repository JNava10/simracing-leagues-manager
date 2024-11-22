import {Track} from "../interfaces/track.interface";
import {BaselineCar} from "../interfaces/car.interface";

export interface CreateStrategyProps {
  lapsNum: number,
  track: Track,
  car: BaselineCar,
}

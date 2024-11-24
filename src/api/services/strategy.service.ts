import {CreateStrategyProps, EstimatedLapTime, StrategyLap} from "../utils/interfaces/strategy.interface";
import {Track} from "../utils/interfaces/track.interface";
import {BaselineCar, StrategyTyre, Tyre} from "../utils/interfaces/car.interface";
import {Layout} from "../utils/interfaces/layout.interface";
import {getNearestNumber, milisToLaptime, roundTo} from "../helpers/common.helper";

export class StrategyService {
    private fuelRemaining = 0;
    private currentTyre: Tyre;
    private currentStint: StrategyLap[] = [];
    private baseLapTimeEstimated: number = 0;
    private currentWearIndexes: number[];

    private car: BaselineCar;
    private trackLayout: Layout;
    private raceLength = 0;
    private estimatedLapTimes: EstimatedLapTime[];
    private raceLaps: StrategyLap[] = [];
    private baseTyreDeltaTime = -50; // Tiempo minimo en milesimas que tiene de impacto un neumatico en una vuelta (aproximación)

    // Impacto que tendrá el neumatico durante las vueltas de carrera. Depende de las caracteristicas del circuito.
    private tyreImpact = 0;

    constructor(
        {trackLayout, raceLength, car, startFuel, estimatedLapTimes}: CreateStrategyProps
    ) {
        this.car = car;
        this.trackLayout = trackLayout;
        this.raceLength = raceLength;
        this.fuelRemaining = startFuel || car.fuelCapacityLitre;
        this.estimatedLapTimes = estimatedLapTimes;
    }

    private mountTyres(tyreId:  number) {
        const searchedTyre = this.car.tyres.find(tyre => tyre.id === tyreId);

        if (!searchedTyre) throw new Error("Neumaticos indicados son invalidos.");

        this.currentTyre = {
            ...searchedTyre,
            wearIndex: 0,
            performance: searchedTyre.wearList[0].performance
        }

        this.tyreImpact = this.calculateTyreImpact();
        this.currentWearIndexes = this.currentTyre.wearList.map(item => item.wearIndex);
    }

    private calculateTyreImpact() {

        // Calculo del factor de desgaste en funcion de las caracteristicas del circuito.
        //
        // Recordar que cada caracteristica tiene un valor max. de 5. Luego se normaliza el total
        // para tener un factor de desgaste que tenga sentido.
        const rawTyreImpact = (
            (this.trackLayout.tyreStress / 5) +
            (this.trackLayout.lateral / 5) +
            (this.trackLayout.braking / 5) +
            (this.trackLayout.traction / 5)
        );

        // Para normalizar el valor, se divide el resultado bruto entre el minimo y la longitud del rango de valores que
        // se pueden obtener. Evidentemente, estos numeros cambian si cambiamos el numero de caracteristicas a tener en cuenta.
        // Se calcula el absoluto para evitar valores negativos.
         return Math.abs(rawTyreImpact / 4);
    }

    simulateLap = () => {
        const car = this.car;

        let lapData: StrategyLap = {
            lapTime: this.baseLapTimeEstimated,
            raceLap: this.raceLaps.length,
            stintLap: this.currentStint.length++,
        };

        lapData = this.simulateTyres(lapData)

        return lapData;
    }

    sim = () => {
        const startTyreId = this.estimatedLapTimes[0].tyreId;

        this.mountTyres(startTyreId);

        // Busqueda del tiempo estimado según el neumatico que se esté llevando.
        this.baseLapTimeEstimated = this.estimatedLapTimes.find(item => item.tyreId === startTyreId).lapTimeMilis;

        for (let i = 0; i < this.raceLength - 1; i++) {
             this.raceLaps.push(
                 this.simulateLap()
             )
        }

        return this.raceLaps;
    }

    private simulateTyres = (lapData: StrategyLap) => {
        let lapTime = this.baseLapTimeEstimated;

        // Aplicando el desgaste de esta vuelta segun los valores indicados en el circuito y la longitud en Km.
        // Se aplica la longitud ya que cuanto mas largo sea el circuito, mayor desgaste habrá por vuelta.
        this.currentTyre.wearIndex += this.tyreImpact * this.trackLayout.lengthKm;
        const nearestTyreIndex = getNearestNumber(this.currentWearIndexes, this.currentTyre.wearIndex);

        this.currentTyre.performance = this.currentTyre.wearList[
            // TODO: Hacer esto mas legible.
            this.currentTyre.wearList.findIndex(item => item.wearIndex === nearestTyreIndex)
            ].performance;

        console.log(this.currentTyre.performance)

        lapTime += Math.round((this.baseTyreDeltaTime + this.currentTyre.wearIndex));

        lapData.wearIndex = this.currentTyre.wearIndex;
        lapData.lapTime = lapTime;

        console.log(milisToLaptime(lapData.lapTime))
        console.log('.........')

        return lapData;
    }

    private getPerformanceLit = () => {
    }
}
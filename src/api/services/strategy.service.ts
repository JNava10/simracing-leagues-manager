import {CreateStrategyProps, EstimatedLapTime, Stint, StrategyLap} from "../utils/interfaces/strategy.interface";
import {BaselineCar, Tyre} from "../utils/interfaces/car.interface";
import {Layout} from "../utils/interfaces/layout.interface";
import {getNearestNumber, milisToLaptime} from "../helpers/common.helper";
import {DrivingPerformance} from "../utils/enum/global.enum";


export class StrategyService {
    private fuelRemaining = 0;
    private currentTyre: Tyre;
    private baseLapTimeEstimated: number = 0;
    private currentWearIndexList: number[];
    private currentPerformanceList: number[];

    private car: BaselineCar;
    private trackLayout: Layout;
    private raceLength = 0;
    private estimatedLapTimes: EstimatedLapTime[];
    private raceLaps: StrategyLap[] = [];
    private strategyTyres: number[] = [];
    private currentStint: Stint

    // Impacto que tendrá el neumatico durante las vueltas de carrera. Depende de las caracteristicas del circuito.
    private tyreImpact = 0;

    private minimumTyrePerformance = 79;
    private currentDrivePerformance: DrivingPerformance;

    constructor(
        {trackLayout, raceLength, car, startFuel, estimatedLapTimes, tyres}: CreateStrategyProps
    ) {
        this.car = car;
        this.trackLayout = trackLayout;
        this.raceLength = raceLength;
        this.fuelRemaining = startFuel || car.fuelCapacityLitre;
        this.estimatedLapTimes = estimatedLapTimes;
        this.strategyTyres = tyres;
    }

    private mountTyres(tyreId: number) {
        const searchedTyre = this.car.tyres.find(tyre => tyre.id === tyreId);

        if (!searchedTyre) throw new Error("Neumaticos indicados son invalidos.");

        // Poniendo neumatico nuevo, reseteando todos sus valores.
        this.currentTyre = {
            ...searchedTyre,
            wearIndex: 0,
            performance: searchedTyre.wearList[0].performance,
        }

        // Calculo del impacto de los neum. en el tiempo por vuelta.
        this.tyreImpact = this.calculateTyreImpact();

        // Mapeo de indices de desgaste y rendimientos para tenerlos en arrays diferentes.
        this.currentWearIndexList = this.currentTyre.wearList.map(item => item.wearIndex);
        this.currentPerformanceList = this.currentTyre.wearList.map(item => item.performance);

        // Busqueda del tiempo estimado según el neumatico que se esté llevando.
        this.baseLapTimeEstimated = this.estimatedLapTimes.find(item => item.tyreId === tyreId).lapTimeMilis;
    }

    private calculateTyreImpact() {

        // Calculo del factor de desgaste en funcion de las caracteristicas del circuito.
        //
        // Recordar que cada caracteristica tiene un valor max. de 5. Luego se normaliza el total
        // para tener un factor de desgaste que tenga sentido.
        const rawTyreImpact = (
            (this.trackLayout.tyreStress / 5 * 0.40) +
            (this.trackLayout.lateral / 5 * 0.20) +
            (this.trackLayout.braking / 5 * 0.10) +
            (this.trackLayout.traction / 5 * 0.30)
        );

        // Se calcula su valor abs. para evitar negativos.
         return Math.abs(rawTyreImpact);
    }

    simulateLap = () => {
        const car = this.car;

        if (this.currentTyre.performance < this.minimumTyrePerformance) {
            const nextTyreIndex = this.currentStint.number + 1;
            const tyreId = this.strategyTyres[nextTyreIndex];
            console.log(tyreId);
            this.makePitStop(tyreId)
        }

        // Contando una vuelta más al stint actual
        this.currentStint.laps++

        let lapData: StrategyLap = {
            lapTime: this.baseLapTimeEstimated,
            raceLap: this.raceLaps.length + 1,
            stintLap: this.currentStint.laps,
        };

        lapData = this.simulateTyres(lapData)
        // lapData = this.simulateDrivingPerformance(lapData)

        lapData = {
            ...lapData,
            lapTimeFormatted: milisToLaptime(lapData.lapTime)
        }

        return lapData;
    }

    sim = () => {
        const startTyreId = this.strategyTyres[0];

        this.mountTyres(startTyreId);

        this.currentDrivePerformance = DrivingPerformance.Neutral;
        this.currentStint = {
            number: 0,
            laps: 0
        }

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
        this.currentTyre.wearIndex += (this.tyreImpact * 0.7) + (this.trackLayout.lengthKm * 0.15);
        this.currentTyre.performance = this.getTyrePerformance();

        lapTime += this.calculateTyreDelta();

        lapData.wearInfo = {
            wearIndex: this.currentTyre.wearIndex,
            performance: this.currentTyre.performance
        };

        lapData.tyreId = this.currentTyre.id;
        lapData.lapTime = lapTime;

        return lapData;
    }

    private getTyrePerformance() {
        const wearIndex = this.currentTyre.wearIndex;
        const wearList = this.currentWearIndexList;
        const nearestWearIndex = getNearestNumber(wearList, wearIndex);
        const i = this.currentTyre.wearList.findIndex(item => item.wearIndex === nearestWearIndex);
        const currentWear = this.currentTyre.wearList[i]

        return currentWear.performance
    }

    private calculateTyreDelta = () => {
        /**
         /// Explicacion de la formula ///

         * Δb (delta) -> Tiempo delta por cada 1% desgaste
         * I -> Impacto de los neumaticos en el tiempo por vuelta. (0-1)
         * Δi -> Tiempo delta segun el impacto (I) = Δb * I
         * Δt -> Delta total que se sumara al tiempo por vuelta = Δb + Δi
         * P (performance) = Rendimiento actual de los neum.
         * Po (Performance optimal) -> 100% rend. con neum. nuevo
         * Tb -> Milisegundos que dura una vuelta, con este neumatico y poco comb.
         * Tw -> Milisegundos que dura una vuelta, pero:
         *     - No se tiene en cuenta el consumo de combustible
         *     - Desgaste según rendimiento
         *     - No se tiene en cuenta la mejora de la pista
         *
         * W (wear) -> % de caida de rendimiento = Po - P
         * Δw -> Tiempo delta que se pierde con rend. actual = W * Δ
         *
         * Tw = Tb + Δw

         /// Calculo del 97% de desgaste (P = 97 %): ///

         * Tb = 90000 ms (por vuelta)
         * I = 0.8
         * Δb = 40 ms
         * Δi = 40 * 0.8 (I) = 32 ms
         * Δt = 40 ms + 32 ms = 72 ms
         *
         * W = 100% (Po) - 97% (P) = 3%
         * WΔ = 3% (W) * 72 ms (Δt) = 216 ms / vuelta
         * Tw = 90000 ms (Tb) + 216 (WΔ)
         * Tw = 90216 ms
         *
         * Tb = 1:30.000
         * Tw = 1:30.216
         */

        const impact = this.tyreImpact; // Δb, delta por cada 1% de desgaste en ms
        const deltaBase = 40; // Δb, tiempo delta por cada 1% de desgaste en ms
        const deltaImpact = Math.round(deltaBase * impact); // Δi, tiempo delta de impacto de los neumaticos sobre el tiempo por vuelta.
        const deltaTotal = deltaBase + deltaImpact + (this.currentTyre.wearIndex * 10); // Δt + Indice de desgaste transformado a milesimas
        const performanceOptimal = 100 // Po

        const wear = performanceOptimal - this.currentTyre.performance; // W

        // console.table({
        //     lap: this.raceLaps.length + 1,
        //     wearIndex: this.currentTyre.wearIndex,
        //     impact,
        //     deltaBase,
        //     deltaImpact,
        //     deltaTotal,
        //     wear,
        //     performanceOptimal,
        //     wearDelta: deltaTotal * wear
        // })

        return Math.round(deltaTotal * (wear * 0.4))  // WΔ, tiempo delta con el desgaste de neumaticos
    }

    private simulateDrivingPerformance = (lapData: StrategyLap): StrategyLap => {
        const offset = 0.005;
        const delta = Math.floor(Math.random() * (this.baseLapTimeEstimated * offset))
        const lapTime = Math.round((this.baseLapTimeEstimated * (this.currentDrivePerformance / 100)) + delta);

        return {
            ...lapData,
            lapTime,
            lapTimeFormatted: milisToLaptime(lapTime)
        }
    }

    private makePitStop = (tyreId: number) => {
        this.mountTyres(tyreId);
        this.currentStint.laps = 0;
    }

    private updateDrivingPerf = (perf: DrivingPerformance) => {
        this.currentDrivePerformance = perf;
    }

    private nextTyreExists = () => {
        return this.strategyTyres[this.currentStint.number + 1] !== null
    }
}
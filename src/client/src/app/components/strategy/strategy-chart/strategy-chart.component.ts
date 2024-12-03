import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Strategy} from "../../../utils/interfaces/strategy.interface";
import {BaseChartDirective} from "ng2-charts";
import {ChartData, ChartOptions, TooltipItem} from "chart.js";
import {GlobalHelper} from "../../../helpers/global.helper";

@Component({
  selector: 'app-strategy-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './strategy-chart.component.html',
  styleUrl: './strategy-chart.component.scss'
})
export class StrategyChartComponent implements OnInit, OnChanges {
  constructor(protected globalHelper: GlobalHelper) {}

  @Input() strategy?: Strategy;

  component = this;

  data?: ChartData
  chartOptions: ChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Vueltas'
        }
      },
      y: {
        ticks: {
          callback: value => {
            return this.globalHelper.milisToLaptime(+value)
          }
        },
        title: {
          display: true,
          text: 'Tiempo (mm:ss.ms)'
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['strategy'] && this.strategy) {
      this.setStrategyData(this.strategy)
    }
  }

  ngOnInit(): void {
    if (this.strategy) {
      this.setStrategyData(this.strategy)
    }
  }

  private setStrategyData = (strategy: Strategy) => {
    const lapTimes = this.strategy?.laps.map(item => item.lapTime!)!;
    const lapNumbers = this.strategy?.laps.map(item => item.raceLap)!;

    this.data = {
      labels: lapNumbers,
      datasets: [{
        label: 'Tiempo por vuelta',
        data: lapTimes,
        fill: true,

        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  }
}

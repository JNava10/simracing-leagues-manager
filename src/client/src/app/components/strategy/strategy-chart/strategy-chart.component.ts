import {Component, inject, Input, OnInit} from '@angular/core';
import {Strategy} from "../../../utils/interfaces/strategy.interface";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartOptions} from "chart.js";
import {GlobalHelper} from "../../../helpers/global.helper";
import {HttpClient} from "@angular/common/http";
import {CustomTextInputComponent} from "../../utils/custom/input/custom-text-input/custom-text-input.component";
import {CustomSelectComponent} from "../../utils/custom/input/custom-select/custom-select.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-strategy-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
  ],
  templateUrl: './strategy-chart.component.html',
  styleUrl: './strategy-chart.component.scss'
})
export class StrategyChartComponent implements OnInit {
  constructor(protected globalHelper: GlobalHelper) {}

  @Input() strategy?: Strategy;

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

  ngOnInit(): void {
    const lapTimes = this.strategy?.laps.map(item => item.lapTime!)!;
    const lapNumbers = this.strategy?.laps.map(item => item.raceLap)!;

    this.setStrategyData(lapNumbers, lapTimes);
  }

  private setStrategyData = (lapNumbers: (number | undefined)[], lapTimes: number[]) => {
    this.data = {
      labels: lapNumbers,
      datasets: [{
        label: 'My First Dataset',
        data: lapTimes,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  }
}

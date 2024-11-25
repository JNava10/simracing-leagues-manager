import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StrategyApiService} from "../../../services/api/strategy-api.service";
import {Strategy} from "../../../utils/interfaces/strategy.interface";
import {StrategyChartComponent} from "../strategy-chart/strategy-chart.component";

@Component({
  selector: 'app-strategy-list',
  standalone: true,
  imports: [
    StrategyChartComponent
  ],
  templateUrl: './strategy-list.component.html',
  styleUrl: './strategy-list.component.scss'
})
export class StrategyListComponent implements OnInit {
  constructor(private router: Router, private strategyService: StrategyApiService) { }

  ngOnInit(): void {
    this.strategyService.getStrategies().subscribe(strategies => {
      this.strategies = strategies;
    })
  }

  strategies?: Strategy[]
}

import { Component, OnInit } from '@angular/core';
import { ChampionshipApiService } from '../../../services/api/championship-api.service';
import { ChampionshipPreset } from '../../../utils/interfaces/championship.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preset-list',
  standalone: true,
  imports: [],
  templateUrl: './preset-list.component.html',
  styleUrl: './preset-list.component.scss'
})
export class PresetListComponent implements OnInit {
  constructor(private championshipService: ChampionshipApiService) {}

  presets?: ChampionshipPreset[]

  ngOnInit(): void {
    this.championshipService.getAllPresets().subscribe(res => {
      this.presets = res.data;
    })
  }

}

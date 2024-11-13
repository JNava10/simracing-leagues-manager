import { GlobalHelper } from './../../../../helpers/global.helper';
import { MessageService } from 'primeng/api';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorTheme, CustomButtonComponent } from "../../../utils/custom-button/custom-button.component";
import { LeagueChampionship } from '../../../../utils/interfaces/championship.interface';
import { ChampionshipApiService } from '../../../../services/api/championship-api.service';
import { DefaultRes } from '../../../../utils/interfaces/responses/response.interface';

@Component({
  selector: 'app-share-config-preset',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './share-config-preset.component.html',
  styleUrl: './share-config-preset.component.scss'
})
export class ShareConfigPresetComponent {
  constructor(private championshipService: ChampionshipApiService, private globalHelper: GlobalHelper) {}

  @Input() championship?: LeagueChampionship

  @Output() ended = new EventEmitter()

  buttonTheme = ColorTheme

  createPreset() {
    this.championshipService.createPreset(this.championship!).subscribe(res => this.afterCreatingPreset())
  }

  afterCreatingPreset(): void {
    this.ended.emit()
  }
}

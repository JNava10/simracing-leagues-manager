import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonTheme, CustomButtonComponent } from "../../../utils/custom-button/custom-button.component";
import { LeagueChampionship } from '../../../../utils/interfaces/championship.interface';

@Component({
  selector: 'app-share-config-preset',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './share-config-preset.component.html',
  styleUrl: './share-config-preset.component.scss'
})
export class ShareConfigPresetComponent {
  @Input() championship?: LeagueChampionship

  @Output() ended = new EventEmitter<boolean>()

  buttonTheme = ButtonTheme


}

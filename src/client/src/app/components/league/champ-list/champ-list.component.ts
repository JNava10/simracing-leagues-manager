import {Component, Input} from '@angular/core';
import {LeagueChampionship} from "../../../utils/interfaces/championship.interface";

@Component({
  selector: 'app-champ-list',
  standalone: true,
  imports: [],
  templateUrl: './champ-list.component.html',
  styleUrl: './champ-list.component.scss'
})
export class ChampListComponent {
  @Input() championships?: LeagueChampionship[];
}

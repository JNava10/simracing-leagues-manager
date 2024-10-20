import {Component} from '@angular/core';
import { CreatingChampRoundStates } from '../../../utils/enums/states.enum';
import { BasicInfoChampionshipFormComponent } from "./basic-info-championship-form/basic-info-championship-form.component";
import { LeagueChampionship, Team } from '../../../utils/interfaces/championship.interface';
import { TeamFormComponent } from "./team-form/team-form.component";

@Component({
  selector: 'app-create-championship',
  standalone: true,
  imports: [BasicInfoChampionshipFormComponent, TeamFormComponent],
  templateUrl: './create-championship.component.html',
  styleUrl: './create-championship.component.scss'
})
export class CreateChampionshipComponent {

  creatingStates = CreatingChampRoundStates; // Hay que crear una variable si queremos usar un enum en el HTML. De lo contrario no funcionará.

  currentCreatingState: CreatingChampRoundStates = CreatingChampRoundStates.CreatingBasicInfo; // Es mas sencillo manejar que se muestra en el modal cambiando su estado, en vez de ifs y booleans.

  championshipCreating?: LeagueChampionship;

  handleBasicDataCreated = (championship: LeagueChampionship) => {
    this.championshipCreating = championship;

    this.currentCreatingState++
  }

  handleTeamsCreated = (teams: Team[]) => {
    if (!this.championshipCreating) {
      return;
    }

    this.championshipCreating!.teams = teams;

    this.currentCreatingState++;

    console.log(this.championshipCreating);
  }
}

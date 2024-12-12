import {Component, OnInit} from '@angular/core';
import {SlicePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ChampionshipApiService} from "../../../services/api/championship-api.service";
import {
  ChampionshipRound,
  LeagueChampionship, Position,
  PositionFormItem
} from "../../../utils/interfaces/championship.interface";
import {User} from "../../../utils/interfaces/user.interface";

@Component({
  selector: 'app-team-results-table',
  standalone: true,
  imports: [
    SlicePipe,
    RouterLink
  ],
  templateUrl: './team-results-table.component.html',
  styleUrl: './team-results-table.component.scss'
})
export class TeamResultsTableComponent implements OnInit {

  constructor(
    private championshipApiService: ChampionshipApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.champId = +this.route.snapshot.params['champId'];

    if (isNaN(this.champId)) throw new Error('El ID de campeonato debe ser un numero');

    this.championshipApiService.getByIdFull(this.champId).subscribe(res => {
      this.championship = res;
    })

    this.championshipApiService.getCalendarById(this.champId).subscribe(res => {
      if (!res) {
        throw new Error('No se ha podido obtener el calendario')
      }

      this.calendar = res!.calendar!
    });

    this.championshipApiService.getEntriesById(this.champId).subscribe(res => {
      this.users = res!.users?.map(item => item.user!)

      this.getResults();
    });
  }

  private getResults() {
    this.championshipApiService.getResults(this.champId!).subscribe(res => this.handleResults(res));
  }

  private handleResults(res: PositionFormItem[]) {
    this.results = res!;
    console.log(this.results)
  }

  champId?: number;
  calendar?: ChampionshipRound[];
  championship?: LeagueChampionship;
  results?: Position[];
  users?: User[];
}

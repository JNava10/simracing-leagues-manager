import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChampionshipApiService} from './../../../services/api/championship-api.service';
import {Component, inject, OnInit} from '@angular/core';
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TrackLayout} from '../../../utils/interfaces/track.interface';
import {DialogModule} from 'primeng/dialog';
import {
  ChampionshipEntry,
  ChampionshipRound, ChampTableResult, LeagueChampionship,
  Position,
  PositionFormItem
} from '../../../utils/interfaces/championship.interface';
import {CustomSelectComponent} from "../../utils/custom/input/custom-select/custom-select.component";
import {User} from '../../../utils/interfaces/user.interface';
import {CustomRadioGroupComponent} from "../../utils/custom/input/custom-radio-group/custom-radio-group.component";
import {SessionFinishStates} from "../../../utils/enums/championship.enum";
import {NgClass, SlicePipe} from "@angular/common";
import {CustomDropdownComponent} from "../../utils/dropdown/custom-dropdown/custom-dropdown.component";
import {CustomDropdownItemComponent} from "../../utils/dropdown/custom-dropdown-item/custom-dropdown-item.component";
import {ignoreElements} from "rxjs";

@Component({
  selector: 'app-championship-results',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, SlicePipe, RouterLink],
  templateUrl: './championship-results.component.html',
  styleUrl: './championship-results.component.scss'
})
export class ChampionshipResultsComponent implements OnInit {

  constructor(
    private championshipApiService: ChampionshipApiService,
    private route: ActivatedRoute,
  ) {
  }

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

  private handleResults(res: ChampTableResult[]) {
    this.results = res!;
  }

  champId?: number;
  calendar?: ChampionshipRound[];
  championship?: LeagueChampionship;
  results?: ChampTableResult[];
  users?: User[];
  roundId?: number;

  protected readonly Object = Object;

  getDriverScore(user: User) {
    const driverFound = this.results!.find(result => result.driverId === user.id);

    const positionScores = this.championship?.scoreSystem!.positions!
    let totalScore = 0;

    driverFound?.results.forEach((round) => {
      if (round.position) {
        const positionFound = positionScores.find((scoreItem, index) => index === round.position! - 1)

        if (positionFound && positionFound.score) {
          totalScore += positionFound.score;
        }
      }
    })

    return totalScore;
  }

  getDriverById = (driverId: number) => {
    return this.users!.find(user => user.id === driverId);
  }
}

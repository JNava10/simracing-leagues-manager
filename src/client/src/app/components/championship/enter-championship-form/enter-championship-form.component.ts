import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTextInputComponent } from "../../utils/custom/input/custom-text-input/custom-text-input.component";
import { EnteringChampStates } from '../../../utils/enums/states.enum';
import { CustomSolidButtonComponent } from "../../utils/button/solid-button/custom-solid-button.component";
import { CustomSelectComponent } from "../../utils/custom/input/custom-select/custom-select.component";
import { EnterChampionship, Team } from '../../../utils/interfaces/championship.interface';
import { ChampionshipApiService } from '../../../services/api/championship-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DefaultRes } from '../../../utils/interfaces/responses/response.interface';
import { GetTeam } from '../../../utils/interfaces/responses/championship.responses';
import { GlobalHelper } from '../../../helpers/global.helper';

@Component({
  selector: 'app-enter-championship-form',
  standalone: true,
  imports: [CustomTextInputComponent, ReactiveFormsModule, CustomSolidButtonComponent, CustomSelectComponent],
  templateUrl: './enter-championship-form.component.html',
  styleUrl: './enter-championship-form.component.scss'
})
export class EnterChampionshipFormComponent implements OnInit {
  constructor(
    private championshipService: ChampionshipApiService,
    private route: ActivatedRoute,
    private globalHelper: GlobalHelper

  ) {

  }

  registrationForm = new FormGroup({
    number: new FormControl(''),
    team: new FormControl('', Validators.required),
    gameName: new FormControl('')
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("champId");
      this.champId = Number(id) ?? null;
    })

    this.route.paramMap.subscribe(params => {
      const id = params.get("leagueId");
      this.leagueId = Number(id) ?? null;
    })

    this.championshipService.getTeams(this.champId!).subscribe(res => this.handleTeams(res!))
  }

  states = EnteringChampStates;
  champId?: number;
  leagueId?: number;
  currentStep: EnteringChampStates = this.states.CreatingBasicInfo;
  teams?: Team[]

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit() {
    const data: EnterChampionship = {
      gameName: this.registrationForm.value.gameName!,
      team: Number(this.registrationForm.value.team),
      number: Number(this.registrationForm.value.number),
    }


    this.championshipService.enter(data, this.champId!).subscribe(res => {
      if (res.executed) {
        this.globalHelper.navigateFromRoot(`league/${this.leagueId}/championships/${this.champId}`);
      }
    })

  }

  handleTeams(res: GetTeam[]): void {
    this.teams = res.map(item => item.team);
  }
}

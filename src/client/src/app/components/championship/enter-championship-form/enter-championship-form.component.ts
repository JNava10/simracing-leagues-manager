import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomTextInputComponent } from "../../utils/custom-text-input/custom-text-input.component";
import { EnteringChampStates } from '../../../utils/enums/states.enum';
import { CustomButtonComponent } from "../../utils/custom-button/custom-button.component";
import { CustomSelectComponent } from "../../utils/custom-select/custom-select.component";
import { Team } from '../../../utils/interfaces/championship.interface';
import { ChampionshipApiService } from '../../../services/api/championship-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DefaultRes } from '../../../utils/interfaces/responses/response.interface';
import { GetTeam } from '../../../utils/interfaces/responses/championship.responses';

@Component({
  selector: 'app-enter-championship-form',
  standalone: true,
  imports: [CustomTextInputComponent, ReactiveFormsModule, CustomButtonComponent, CustomSelectComponent],
  templateUrl: './enter-championship-form.component.html',
  styleUrl: './enter-championship-form.component.scss'
})
export class EnterChampionshipFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private championshipService: ChampionshipApiService, private route: ActivatedRoute) {
    this.registrationForm = this.fb.group({
      number: [''],
      team: ['', Validators.required],
      nickname: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("champId");
      this.champId = Number(id) ?? null;
    })

    this.championshipService.getTeams(this.champId!).subscribe(res => this.handleTeams(res))
  }

  states = EnteringChampStates;
  champId?: number;
  registrationForm: FormGroup;
  currentStep: EnteringChampStates = this.states.CreatingBasicInfo;
  teams?: Team[]

  nextStep() {
    if (this.currentStep === 1 && this.registrationForm.get('team')?.valid) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
    }
  }

  handleTeams(res: DefaultRes<GetTeam[]>): void {
    this.teams = res.data?.map(item => item.team);
  }
}

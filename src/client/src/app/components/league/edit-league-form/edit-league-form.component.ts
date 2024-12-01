import {Component, inject, OnInit} from '@angular/core';
import {LeagueApiService} from "../../../services/api/league-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {League} from "../../../utils/interfaces/league.interface";
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";
import {CustomTextInputComponent} from "../../utils/custom/input/custom-text-input/custom-text-input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgxColorsModule} from "ngx-colors";
import {StyleClassModule} from "primeng/styleclass";
import {CustomColorPickerComponent} from "../../utils/custom/custom-color-picker/custom-color-picker.component";

@Component({
  selector: 'app-edit-league-form',
  standalone: true,
  imports: [
    CustomSolidButtonComponent,
    CustomTextInputComponent,
    ReactiveFormsModule,
    NgxColorsModule,
    StyleClassModule,
    CustomColorPickerComponent
  ],
  templateUrl: './edit-league-form.component.html',
  styleUrl: './edit-league-form.component.scss'
})
export class EditLeagueFormComponent implements OnInit {
  constructor(private leagueService: LeagueApiService, protected route: ActivatedRoute, protected router: Router) {}

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("leagueId");
      this.leagueId = Number(id) ?? null;
    })


    if (this.leagueId) {
      this.leagueService.getLeague(this.leagueId).subscribe(league => this.handleGetLeague(league));
    }
  }

  private handleGetLeague(league: League) {
    this.league = league;
    this.editLeagueForm.patchValue({
      name: league.name,
      description: league.description,
    })

    console.log(league);
  }

  league!: League;
  leagueId?: number;

  editLeagueForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    color: ['', [Validators.required, Validators.maxLength(255)]],
    logoImg: ['', [Validators.required, Validators.maxLength(255)]],
    bannerImg: ['', [Validators.required, Validators.maxLength(255)]],
  });




  onSubmit(): void {
    if (this.editLeagueForm!.valid) {
      console.log('League Data:', this.editLeagueForm!.value);
    }

    const data = this.editLeagueForm.value as League;

    this.leagueService.editLeague(this.leagueId!, data).subscribe(res => this.handleEditingLeague(res))
  }

  private handleEditingLeague(res: League) {
    this.league = res;
  }
}

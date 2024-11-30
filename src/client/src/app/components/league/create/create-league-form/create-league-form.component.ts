import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LeagueApiService} from "../../../../services/api/league-api.service";
import {League} from "../../../../utils/interfaces/league.interface";
import {MessageService} from "primeng/api";
import {GlobalHelper} from "../../../../helpers/global.helper";

@Component({
  selector: 'app-create-league-form',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './create-league-form.component.html',
  styleUrl: './create-league-form.component.scss'
})
export class CreateLeagueFormComponent {
  constructor(private leagueApiService: LeagueApiService, private messageService: MessageService, private globalHelper: GlobalHelper) {}

  createLeagueForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  get name() {
    return this.createLeagueForm.get('name')!;
  }

  get description() {
    return this.createLeagueForm.get('description')!;
  }

  get category() {
    return this.createLeagueForm.get('category')!;
  }

  createLeague = () => {
    if (this.createLeagueForm.invalid) return;

    const data = this.createLeagueForm.value as League;

    this.leagueApiService.createLeague(data).subscribe({
      next: (data) => this.afterCreatingLeague(data),
      error: (error) => this.globalHelper.handleRequestDefaultError(error, this.messageService),
    })
  }

  private afterCreatingLeague = async (data: League) => {
    await this.globalHelper.navigateFromRoot('leagues')
  }
}

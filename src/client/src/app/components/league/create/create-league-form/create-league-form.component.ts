import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LeagueApiService} from "../../../../services/api/league-api.service";
import {League} from "../../../../utils/interfaces/league.interface";
import {MessageService} from "primeng/api";
import {GlobalHelper} from "../../../../helpers/global.helper";
import {CustomTextInputComponent} from "../../../utils/custom/input/custom-text-input/custom-text-input.component";
import {CustomSolidButtonComponent} from "../../../utils/button/solid-button/custom-solid-button.component";
import {CustomFileDragDropComponent} from "../../../utils/custom/custom-file-drag-drop/custom-file-drag-drop.component";
import {CustomColorPickerComponent} from "../../../utils/custom/custom-color-picker/custom-color-picker.component";

@Component({
  selector: 'app-create-league-form',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    CustomTextInputComponent,
    CustomSolidButtonComponent,
    CustomFileDragDropComponent,
    CustomColorPickerComponent
  ],
  templateUrl: './create-league-form.component.html',
  styleUrl: './create-league-form.component.scss'
})
export class CreateLeagueFormComponent {
  constructor(private leagueApiService: LeagueApiService, private messageService: MessageService, private globalHelper: GlobalHelper) {}

  createLeagueForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    color: new FormControl(''),
  });

  get name() {
    return this.createLeagueForm.get('name')!;
  }

  get description() {
    return this.createLeagueForm.get('description')!;
  }

  get color() {
    return this.createLeagueForm.get('color')!;
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
    if (data.id) {
      await this.globalHelper.navigateFromRoot(`league/${data.id}`); // POST DEFENSA: Se me habia colado una 's' en league/
    } else {
      this.globalHelper.showErrorMessage('Error', "No se ha podido obtener la nueva liga.");
    }
  }
}

import { Component } from '@angular/core';
import {CustomTextInputComponent} from "../../../utils/custom-text-input/custom-text-input.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomFileDragDropComponent} from "../../../utils/custom/custom-file-drag-drop/custom-file-drag-drop.component";

@Component({
  selector: 'app-edit-league-form',
  standalone: true,
  imports: [
    CustomTextInputComponent,
    CustomFileDragDropComponent,
    ReactiveFormsModule
  ],
  templateUrl: './edit-league-form.component.html',
  styleUrl: './edit-league-form.component.scss'
})
export class EditLeagueFormComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
}

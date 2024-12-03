import {NgClass, NgFor, NgStyle} from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomTextInputComponent } from "../../utils/custom/input/custom-text-input/custom-text-input.component";
import {ChampionshipPreset, LeagueChampionship, Team} from '../../../utils/interfaces/championship.interface';
import { NgxColorsModule } from 'ngx-colors';
import {Category} from "../../../utils/interfaces/category.interface";
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";

@Component({
  selector: 'app-create-teams',
  standalone: true,
  imports: [FormsModule, CustomTextInputComponent, ReactiveFormsModule, NgStyle, NgxColorsModule, CustomSolidButtonComponent],
  templateUrl: './create-teams.component.html',
})
export class CreateTeamsComponent implements OnInit {

  ngOnInit(): void {
    if (this.preset) {
      this.teams = this.preset.teams;
    }

    if (this.teams === undefined || this.teams === null) {
      this.teams = [];

      this.teams.push(this.defaultTeam)
    }

    this.selectTeam(0);
  }

  @Input() preset?: ChampionshipPreset;

  @Output() protected teamsCreated = new EventEmitter<Team[]>();

  protected defaultTeam: Team = {
    name: "Nuevo Equipo",
    hexColor: "#aaffbb",
    carEntries: 2
  }

  /**
   * Información del equipo seleccionado.
   *
   * @property {FormGroup} `controls` - Formulario del equipo seleccionado.
   * @property {number} `index` - Indice del equipo seleccionado dentro del array.
   */
  selectedTeam = {
    controls: new FormGroup({
      name: new FormControl(''),
      hexColor: new FormControl(''),
      carEntries: new FormControl(0)
    }),

    index: 0
  }

  @Input() teams?: Team[];

  categorySelected?: Category;

  /**
   * Selecciona el equipo a editar.
   * @param index Indice del equipo a seleccionar dentro del array
   */
  protected selectTeam(index: number) {
    const { name, hexColor, carEntries } = this.teams![index];

    // Con el operador '??' es posible asegurarse de que la variable va a existir (con un valor o otro predefinido),
    // aunque en la interfaz 'Team' las propiedades puedan estar indefinidas
    this.selectedTeam.controls.setValue({
      name: name ?? '',
      hexColor: hexColor ?? '',
      carEntries: carEntries ?? 0
    });

    this.selectedTeam.index = index;
  }


  onChangeName(value: string) {
    console.log(this.selectedTeam.controls.value.carEntries)
  }

  saveTeams() {
    this.teamsCreated.emit(this.teams);
  }

  /**
   * Añade un nuevo equipo a la lista.
   * @param team Equipo a añadir
   */
  protected addTeam(team: Team = this.defaultTeam) {
    if (this.teams) {
      this.teams.push(team);
    }
  }

    /**
   * Añade un nuevo equipo a la lista.
   * @param team Equipo a añadir
   */
    protected saveTeam(index: number) {
      if (this.teams) {
        let newTeam = this.selectedTeam.controls.value as Team;

        newTeam.carEntries = newTeam.carEntries! > 0 ? Number(newTeam.carEntries!): 0;

        this.teams[index] = newTeam;
      }
    }
}

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
  imports: [FormsModule, CustomTextInputComponent, ReactiveFormsModule, NgStyle, NgxColorsModule, NgClass, CustomSolidButtonComponent],
  templateUrl: './create-teams.component.html',
})
export class CreateTeamsComponent implements OnInit {

  ngOnInit(): void {
    this.championship = {
      "name": "dasda",
      "description": "dsada",
      "leagueId": 4,
      "calendar": [
        {
          "name": "Silverstone Circuit - Grand Prix",
          "length": {
            "value": undefined,
            "type": 0
          },
          "layoutId": 1
        },
        {
          "name": "Suzuka Circuit - Grand Prix",
          "length": {
            "value": undefined,
            "type": undefined
          },
          "layoutId": 4
        },
        {
          "name": "Sebring International Raceway - Original",
          "length": {
            "value": undefined,
            "type": undefined
          },
          "layoutId": 5
        }
      ],
      "categories": [
        {
          "id": 1,
          "name": "Formula 1",
          "description": ""
        }
      ],
      "simulatorId": 3
    }

    if (this.preset) {
      this.teams = this.preset.teams;
    } else if (this.championship) {
      this.teams = this.championship.teams!
      console.log(this.championship)
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

  teams: Team[] = [];

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

  @Input() championship?: LeagueChampionship;

  categorySelected?: Category;

  /**
   * Selecciona el equipo a editar.
   * @param index Indice del equipo a seleccionar dentro del array
   */
  protected selectTeam(index: number) {
    const { name, hexColor, carEntries } = this.teams[index];

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
    console.log(this.teams)
    this.teamsCreated.emit(this.teams);
  }

  /**
   * Añade un nuevo equipo a la lista.
   * @param team Equipo a añadir
   */
  protected addTeam(team: Team = this.defaultTeam) {
    this.teams.push(team);
  }

    /**
   * Añade un nuevo equipo a la lista.
   * @param team Equipo a añadir
   */
    protected saveTeam(index: number) {
      let newTeam = this.selectedTeam.controls.value as Team;

      newTeam.carEntries = newTeam.carEntries! > 0 ? Number(newTeam.carEntries!): 0;

      this.teams[index] = newTeam;
    }
}

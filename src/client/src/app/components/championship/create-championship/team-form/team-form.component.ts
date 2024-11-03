import { NgFor, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomTextInputComponent } from "../../../utils/custom-text-input/custom-text-input.component";
import { ChampionshipPreset, Team } from '../../../../utils/interfaces/championship.interface';
import { NgxColorsModule } from 'ngx-colors';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [FormsModule, NgFor, CustomTextInputComponent, ReactiveFormsModule, NgStyle, NgxColorsModule],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.scss'
})
export class TeamFormComponent implements OnInit {

  ngOnInit(): void {
    if (this.preset) {
      this.teams = this.preset.teams.map(item => item.team);
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

  teams: Team[] = [this.defaultTeam];

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

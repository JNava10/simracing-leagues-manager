import { map } from 'rxjs/operators';
import { GlobalHelper } from './../../../../helpers/global.helper';
import { roundDurationTypes } from './../../../../utils/constants/global.constants';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Track, TrackLayout } from '../../../../utils/interfaces/track.interface';
import { Observable, of } from 'rxjs';
import { LeagueChampionship, ChampionshipRound, RoundLength as RoundLength, RoundDurationType, ChampionshipPreset } from '../../../../utils/interfaces/championship.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ChampFormStates } from '../../../../utils/enums/states.enum';
import { ScoreSystem } from '../../../../utils/interfaces/score.interface';
import { DefaultRes } from '../../../../utils/interfaces/responses/response.interface';
import { SimulatorGame } from '../../../../utils/interfaces/simulator.interface';
import { Category } from '../../../../utils/interfaces/category.interface';
import { ChampionshipApiService } from '../../../../services/api/championship-api.service';
import { CategoryApiService } from '../../../../services/api/category-api.service';
import { ActivatedRoute } from '@angular/router';
import { ScoreApiService } from '../../../../services/api/score-api.service';
import { SimulatorApiService } from '../../../../services/api/simulator-api.service';
import { TrackApiService } from '../../../../services/api/track-api.service';
import { NgIf, AsyncPipe, NgClass, SlicePipe } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CustomSearchInputComponent } from '../../../utils/custom/input/custom-search-input/custom-search-input.component';
import { SESSION_DURATION_TYPE, SESSION_DURATION_TYPE as SESSION_LENGTH_TYPE } from '../../../../utils/enums/round.enum';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { Errors } from '../../../../utils/enums/errors.enum';
import { EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {CustomTextInputComponent} from "../../../utils/custom/input/custom-text-input/custom-text-input.component";
import {SimSearchFormComponent} from "../../../utils/search/sim-search-form/sim-search-form.component";
import {CategorySearchFormComponent} from "../../../utils/search/category-search-form/category-search-form.component";
import {CustomBadgeComponent} from "../../../utils/custom/badge/custom-badge.component";
import {RoundListComponent} from "../../round-list/round-list.component";
import {LoginComponent} from "../../../auth/login/login.component";
import {CustomSelectComponent} from "../../../utils/custom/input/custom-select/custom-select.component";
import {CustomButtonComponent} from "../../../utils/custom/input/custom-button/custom-button.component";
import {TrackSearchFormComponent} from "../../../utils/forms/track-search-form/track-search-form.component";

@Component({
  selector: 'app-basic-info-championship-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    DropdownModule,
    AccordionModule,
    DialogModule,
    CustomSearchInputComponent,
    FormsModule,
    MessagesModule,
    CustomTextInputComponent,
    SimSearchFormComponent,
    CategorySearchFormComponent,
    CustomBadgeComponent,
    SlicePipe,
    CustomSelectComponent,
    CustomButtonComponent,
    TrackSearchFormComponent
  ],
  templateUrl: './basic-info-championship-form.component.html',
  styleUrl: './basic-info-championship-form.component.scss'
})
export class BasicInfoChampionshipFormComponent implements OnInit {
  constructor(
    private categoryService: CategoryApiService,
    private simulatorService: SimulatorApiService,
    private trackService: TrackApiService,
    private route: ActivatedRoute,
  ) {}

  @Input() leagueId?: number;
  @Input() preset?: ChampionshipPreset;
  @Input() championship?: LeagueChampionship;

  @Output() protected basicDataCreated = new EventEmitter<LeagueChampionship>();

  protected tracks!: Track[];

  protected categories$!: Observable<DefaultRes<Category[]>>;

  protected simulators$!:  Observable<DefaultRes<SimulatorGame[]>>;

  ngOnInit() {
    this.leagueId = this.route.snapshot.params['leagueId'];

    if (this.championship) {
      this.applyChampData(this.championship);
    } else if (this.preset) {
      this.convertDataFromApi(this.preset)
    }
  }

  convertDataFromApi(preset: ChampionshipPreset) {
    console.log(preset)

    preset.calendar.forEach(layout => {
      this.raceCalendar.push({
        name: layout.name, // TODO: Poner el nombre de la ronda.
        layout: layout
      })
    })

    this.selectedSimulator = preset.simulator;

    console.log(this.selectedSimulator)
  }

  private applyChampData = (championship: LeagueChampionship) => {
    console.log(championship)

    this.championshipForm.patchValue({
      name: championship.name,
      description: championship.description,
    });

    console.log(this.championshipForm.value);

    this.raceCalendar = championship.calendar!
  }

  /// Enums ///

  durationTypes = SESSION_LENGTH_TYPE;

  /// Datos basicos ///

  raceCalendar: ChampionshipRound[] = []

  selectedCategories: Category[] = [];

  championshipForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });


  get name() {
    return this.championshipForm.get('name')!.value;
  }

  get description() {
    return this.championshipForm.get('description')!.value;
  }

  selectedSimulator?: SimulatorGame;
  private layoutsSearched = false;

  // Rondas de campeonato //

  protected durationTypeList = roundDurationTypes;

  protected addingRace: boolean = false;

  protected roundTrackSelected?: Track;

  protected roundCreating: ChampionshipRound = {}

  championshipRoundForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null),
    layout: new FormControl<TrackLayout | null>(null),
    length: new FormGroup({
      value: new FormControl<number | null>(null),
      type: new FormControl<SESSION_DURATION_TYPE | null>(0)
    })
  });

  protected get roundName() {
    return this.championshipRoundForm.get('name') as FormControl;
  }

  protected get roundLayout() {
    return this.championshipRoundForm.get('layout') as FormControl<TrackLayout | undefined>;
  }

  protected get roundLength() {
    return this.championshipRoundForm.get('length') as FormControl<RoundLength | undefined>;
  }

  /// Busqueda de todos los dropdowns ///

  // Categoria //

  protected searchCategories = (value: string) => {
    this.categories$ = of();

    if (value.length === 0) return;

    this.categories$ = this.categoryService.search({name: value});
  }

  protected searchingCategory = false;

  // Simulador //

  protected searchSimulator = (value: string) => {
    this.simulators$ = of();

    if (value.length === 0) return

    this.simulators$ = this.simulatorService.search({name: value});
  }

  // Circuitos //

  protected searchTrackLayouts = (value: string) => {
    if (value.length === 0) return;

    this.layoutsSearched = true

    this.trackService.searchLayouts({name: value}).subscribe(res => this.tracks = res);
  }

  /// Circuitos ///

  protected saveRound = () => {
    this.setRoundName();

    let round = this.championshipRoundForm.value as ChampionshipRound;

    this.raceCalendar.push(round)

    this.championshipRoundForm.reset()
  }

  protected deleteTrack = (index: number) => {
    this.raceCalendar.splice(index, 1);
  }

  showAddRace = () => {
    this.addingRace = true
  }

  selectLayout = (layout: TrackLayout, track: Track) => {
    layout.parent = track;
    this.roundLayout.setValue(layout);
  }

  /// Gestionar las rondas de campeonatos ///

  getRoundLayoutName = () => {
    // Esto se mostrará si no se ha introducido ningun nombre.
    // Ej: Suzuka Circuit - East Loop.
    return `${this.roundLayout.value?.parent?.name} - ${this.roundLayout.value?.name}`
  }

  saveRoundAndContinue = () => {
    this.saveRound();
  }

  saveRoundAndClose = () => {
    this.saveRound();
    this.addingRace = false;
  }

  private setRoundName = () => {
    let nameToSet = this.roundName.value || this.getRoundLayoutName();

    this.roundName.setValue(nameToSet);
  }

  /// Gestionar las categorias ///

  toggleCategory = (category: Category, checked: boolean, index: number) => {
    checked ? this.addCategory(category) : this.removeCategory(category)
  }

  private addCategory = (category: Category) => {
    this.selectedCategories.push(category)
  }

  private removeCategory = (category: Category) => {
    const index = this.selectedCategories.findIndex(finding => finding.id === category.id)

    this.selectedCategories.splice(index, 1);
  }

  protected goToNextPage = () => {

    let championship = this.championshipForm.value as LeagueChampionship

    championship.leagueId = this.leagueId;
    championship.calendar = this.raceCalendar;

    championship.calendar.forEach(entry => {
      // Unicamente se utilizará el ID de cada trazado, por lo que el resto no hará falta.
      entry.layoutId = entry.layout?.id;
      entry.layout = undefined;
    });

    championship!.categories = []

    this.selectedCategories.forEach(item => {
      championship.categories?.push(item);
    });

    championship.simulatorId = this.selectedSimulator?.id;

    this.basicDataCreated.emit(championship);
  }

  confirmCategory = ($event: Category) => {
    this.selectedCategories.push($event)
  };

  protected readonly Number = Number;
}

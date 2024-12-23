import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryApiService} from "../../../../services/api/category-api.service";
import {SimulatorApiService} from "../../../../services/api/simulator-api.service";
import {TrackApiService} from "../../../../services/api/track-api.service";
import {ActivatedRoute} from "@angular/router";
import {
  ChampionshipPreset,
  ChampionshipRound,
  LeagueChampionship, LeagueEvent, RoundLength
} from "../../../../utils/interfaces/championship.interface";
import {Observable, of} from "rxjs";
import {DefaultRes} from "../../../../utils/interfaces/responses/response.interface";
import {Track, TrackLayout} from "../../../../utils/interfaces/track.interface";
import {Category} from "../../../../utils/interfaces/category.interface";
import {SimulatorGame} from "../../../../utils/interfaces/simulator.interface";
import {SESSION_DURATION_TYPE, SESSION_DURATION_TYPE as SESSION_LENGTH_TYPE} from "../../../../utils/enums/round.enum";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {roundDurationTypes} from "../../../../utils/constants/global.constants";
import {AsyncPipe, NgIf, SlicePipe} from "@angular/common";
import {CustomSearchInputComponent} from "../../../utils/custom/input/custom-search-input/custom-search-input.component";
import {DialogModule} from "primeng/dialog";
import {CustomTextInputComponent} from "../../../utils/custom/input/custom-text-input/custom-text-input.component";
import {TrackSearchFormComponent} from "../../../utils/forms/track-search-form/track-search-form.component";
import {CustomCardComponent} from "../../../utils/custom/custom-card/custom-card.component";
import {CustomEmptyComponent} from "../../../utils/custom/custom-empty/custom-empty.component";
import {CustomSolidButtonComponent} from "../../../utils/button/solid-button/custom-solid-button.component";
import {CustomBadgeComponent} from "../../../utils/custom/badge/custom-badge.component";
import {SimSearchFormComponent} from "../../../utils/search/sim-search-form/sim-search-form.component";
import {CategorySearchFormComponent} from "../../../utils/search/category-search-form/category-search-form.component";
import {SoftButtonComponent} from "../../../utils/button/soft-button/soft-button.component";

@Component({
  selector: 'app-basic-info-event-form',
  standalone: true,
  imports: [
    DialogModule,
    NgIf,
    ReactiveFormsModule,
    CustomTextInputComponent,
    TrackSearchFormComponent,
    CustomCardComponent,
    CustomBadgeComponent,
    CustomSolidButtonComponent,
    SimSearchFormComponent,
    CategorySearchFormComponent,
    CustomEmptyComponent,
    SoftButtonComponent,
  ],
  templateUrl: './basic-info-event-form.component.html',
  styleUrl: './basic-info-event-form.component.scss'
})
export class BasicInfoEventFormComponent {
  protected settingSim = false;
  constructor(
    private categoryService: CategoryApiService,
    private simulatorService: SimulatorApiService,
    private trackService: TrackApiService,
    private route: ActivatedRoute,
  ) {}

  @Input() leagueId?: number;
  @Input() preset?: ChampionshipPreset;

  @Output() protected basicDataCreated = new EventEmitter<LeagueEvent>();

  protected tracks!: Track[]

  protected categories$!: Observable<DefaultRes<Category[]>>;

  protected simulators$!:  Observable<DefaultRes<SimulatorGame[]>>;

  convertDataFromApi(preset: ChampionshipPreset) {
    console.log(preset)
    let calendar = preset.calendar
  }

  /// Enums ///

  durationTypes = SESSION_LENGTH_TYPE;

  /// Datos basicos ///

  selectedLayout?: TrackLayout;

  selectedCategories: Map<number, Category> = new Map();

  eventForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  get name() {
    return this.eventForm.get('name')!.value;
  }

  get description() {
    return this.eventForm.get('description')!.value;
  }

  selectedSimulator?: SimulatorGame

  // Rondas de campeonato //

  protected durationTypeList = roundDurationTypes

  protected settingRace: boolean = false;

  protected roundTrackSelected?: Track;

  protected roundCreating: ChampionshipRound = {}

  protected durationLocked = false;

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

  protected get roundLengthValue() {
    return this.roundLength.get('value') as FormControl<number | null>;
  }

  protected get roundLengthType() {
    return this.roundLength.get('type') as FormControl<SESSION_DURATION_TYPE | undefined>;
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

  selectLayout = (layout: TrackLayout) => {
    console.log(layout)
    this.settingRace = false;
    this.selectedLayout = layout;
  }

  /// Gestionar las rondas de campeonatos ///

  getRoundLayoutName = () => {
    console.log(this.roundLayout)
    // Esto se mostrará si no se ha introducido ningun nombre.
    // Ej: Suzuka Circuit - East Loop.
    return `${this.roundLayout.value?.parent?.name} - ${this.roundLayout.value?.name}`
  }

  lockDuration = () => {
    this.durationLocked = !this.durationLocked;
  }

  toggleCategory = (category: Category, checked: boolean, index: number) => {
    checked ? this.addCategory(category) : this.removeCategory(category)
  }

  /// Gestionar las categorias ///

  protected removeLayout() {
    this.selectedLayout = undefined;
  }

  private addCategory = (category: Category) => {
    category.id = this.selectedCategories.size + 1
    this.selectedCategories.set(category.id, category);
  };

  protected removeCategory = (category: Category) => {
    if (!category.id) throw new Error('No se ha encontrado la categoria a borrar')

    this.selectedCategories.delete(category.id);
  };

  protected goToNextPage = () => {

    let event = this.eventForm.value as LeagueEvent;

    event.leagueId = this.leagueId;
    event.layout = this.selectedLayout!;

    this.selectedCategories.forEach(item => {
      event.categoryIds?.push(item.id!);
    });

    event.simulatorId = this.selectedSimulator?.id;

    this.basicDataCreated.emit(event);
  }

  protected addingCategory = false;

  confirmCategory = ($event: Category) => {
    this.addCategory($event)
    this.addingCategory = false;
  };

  showAddCategory = () => {
    this.addingCategory = true;
  };

  showSetRace = () => {
    this.settingRace = true
  };

  showSetSim() {
    this.settingSim = true
  }

  selectSim($event: SimulatorGame) {
    this.selectedSimulator = $event
    this.settingSim = false
  }

  removeSim() {
    this.selectedSimulator = undefined;
  }
}

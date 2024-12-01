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

@Component({
  selector: 'app-basic-info-event-form',
  standalone: true,
  imports: [
    AsyncPipe,
    CustomSearchInputComponent,
    DialogModule,
    NgIf,
    ReactiveFormsModule,
    CustomTextInputComponent,
    TrackSearchFormComponent,
    CustomCardComponent,
  ],
  templateUrl: './basic-info-event-form.component.html',
  styleUrl: './basic-info-event-form.component.scss'
})
export class BasicInfoEventFormComponent {
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

  selectedCategories: Category[] = [];

  createChampionshipForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  get name() {
    return this.createChampionshipForm.get('name')!.value;
  }

  get description() {
    return this.createChampionshipForm.get('description')!.value;
  }

  selectedSimulator?: SimulatorGame

  // Rondas de campeonato //

  protected durationTypeList = roundDurationTypes

  protected addingRace: boolean = false;

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

  // Circuitos //

  protected searchTrackLayouts = (value: string) => {
    this.tracks

    if (value.length === 0) return

    this.trackService.searchLayouts({name: value}).subscribe(res => this.tracks = res);
  }

  /// Circuitos ///


  selectLayout = (layout: TrackLayout) => {
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

  private setRoundName = () => {
    let nameToSet = this.roundName.value || this.getRoundLayoutName();

    this.roundName.setValue(nameToSet);
  }

  /// Gestionar las categorias ///

  private addCategory = (category: Category) => {
    this.selectedCategories.push(category)
  }

  private removeCategory = (category: Category) => {
    const index = this.selectedCategories.findIndex(finding => finding.id === category.id)

    this.selectedCategories.splice(index, 1);
  }

  protected removeLayout() {
    this.selectedLayout = undefined;
  }

  protected goToNextPage = () => {

    let event = this.createChampionshipForm.value as LeagueEvent;
    //
    // event.leagueId = this.leagueId;
    // event.leagueId = this.leagueId;
    // event.layout = this.selectedLayout!;

    // this.selectedCategories.forEach(item => {
    //   event.categoryIds?.push(item.id!);
    // });
    //
    // event.simulatorId = this.selectedSimulator?.id;

    event = {
      name: "Gran Final de la Temporada",
      description: "El evento culminante de la temporada, donde los mejores equipos compiten por el campeonato.",
      categoryIds: [1],
      simulatorId: 1,
      layout: {
        name: 'AAAA',
        parent: {
          name: "SSSS",
        },
      },
      layoutId: 1
    }

    this.basicDataCreated.emit(event);
  }

  handleTrackSelected = ($event: TrackLayout) => {

  };
}

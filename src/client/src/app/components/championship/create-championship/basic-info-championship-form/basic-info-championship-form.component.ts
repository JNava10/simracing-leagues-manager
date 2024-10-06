import { GlobalHelper } from './../../../../helpers/global.helper';
import { roundDurationTypes } from './../../../../utils/constants/global.constants';
import { Component, Input, Output } from '@angular/core';
import { Track, TrackLayout } from '../../../../utils/interfaces/track.interface';
import { Observable, of } from 'rxjs';
import { LeagueChampionship, ChampionshipRound, RoundLength as RoundLength, RoundDurationType } from '../../../../utils/interfaces/championship.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CreatingChampRoundStates } from '../../../../utils/enums/states.enum';
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
import { CustomSearchInputComponent } from '../../../utils/custom-search-input/custom-search-input.component';
import { SESSION_DURATION_TYPE, SESSION_DURATION_TYPE as SESSION_LENGTH_TYPE } from '../../../../utils/enums/round.enum';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { Errors } from '../../../../utils/enums/errors.enum';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-basic-info-championship-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    DropdownModule,
    AsyncPipe,
    SlicePipe,
    AccordionModule,
    DialogModule,
    CustomSearchInputComponent,
    FormsModule,
    MessagesModule
  ],
  templateUrl: './basic-info-championship-form.component.html',
  styleUrl: './basic-info-championship-form.component.scss'
})
export class BasicInfoChampionshipFormComponent {
  constructor(
    private championshipService: ChampionshipApiService,
    private categoryService: CategoryApiService,
    private simulatorService: SimulatorApiService,
    private trackService: TrackApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private globalHelper: GlobalHelper,
  ) {}

  @Input() leagueId?: number;

  protected tracks$!: Observable<DefaultRes<Track[]>>;

  protected categories$!: Observable<DefaultRes<Category[]>>;

  protected scoreSystems$!: Observable<ScoreSystem[]>;

  protected simulators$!:  Observable<DefaultRes<SimulatorGame[]>>;

  ngOnInit() {
    this.leagueId = this.route.snapshot.params['leagueId'];
  }

  /// Enums ///

  durationTypes = SESSION_LENGTH_TYPE;

  /// Datos basicos ///

  raceCalendar: ChampionshipRound[] = []

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
    this.tracks$ = of();

    if (value.length === 0) return

    this.tracks$ = this.trackService.searchLayouts({name: value});
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

  selectLayout = (track: Track, layout: TrackLayout) => {
    const layoutWithTrack = layout;

    layoutWithTrack.track = track; // Esto servirá para mostrar los datos del circuito al que pertenece el trazado.

    this.roundLayout.setValue(layout);
  }

  /// Gestionar las rondas de campeonatos ///

  getRoundLayoutName = () => {
    console.log(this.roundLayout)
    // Esto se mostrará si no se ha introducido ningun nombre.
    // Ej: Suzuka Circuit - East Loop.
    return `${this.roundLayout.value?.track?.name} - ${this.roundLayout.value?.name}`
  }

  saveRoundAndContinue = () => {
    this.saveRound();
  }

  saveRoundAndClose = () => {
    this.saveRound();
    this.addingRace = false;
  }

  lockRoundDuration = () => {
    this.durationLocked = !this.durationLocked;
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

  /// Siguiente pagina ///

  @Output() protected basicDataCreated = new EventEmitter<LeagueChampionship>()

  protected goToNextPage = () => {

    let championship = this.createChampionshipForm.value as LeagueChampionship

    // championship.calendar = this.raceCalendar;

    // championship.calendar.forEach(entry => {
    //   // Unicamente se utilizará el ID de cada trazado, por lo que el resto no hará falta.
    //   entry.layoutId = entry.layout?.id;
    //   entry.layout = undefined;
    // })

    // this.selectedCategories.forEach(item => {
    //   championship.categoryIds?.push(item.id!);
    // })

    // championship.simulatorId = this.selectedSimulator?.id;

    // DATOS DE PRUEBA //

    // TODO: Borrar

    championship.name = "Prueba";
    championship.description = "Descripción";
    championship.categoryIds = [1];
    championship.simulatorId = 1;

    console.log(championship);

    this.basicDataCreated.emit(championship);
  }
}

import { GlobalHelper } from './../../../../helpers/global.helper';
import { roundDurationTypes } from './../../../../utils/constants/global.constants';
import { Component, Input } from '@angular/core';
import { Track } from '../../../../utils/interfaces/track.interface';
import { Observable, of } from 'rxjs';
import { ChampionshipCreation, ChampionshipRound, RoundLength as RoundLength, RoundDurationType } from '../../../../utils/interfaces/championship.interface';
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
    private scoreService: ScoreApiService,
    private simulatorService: SimulatorApiService,
    private trackService: TrackApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private globalHelper: GlobalHelper,
    private formBuilder: FormBuilder
  ) {}

  @Input() leagueId?: number;

  protected tracks$!: Observable<DefaultRes<Track[]>>;

  protected categories$!: Observable<DefaultRes<Category[]>>;

  protected scoreSystems$!: Observable<ScoreSystem[]>;

  protected simulators$!:  Observable<DefaultRes<SimulatorGame[]>>;

  ngOnInit() {
    this.leagueId = this.route.snapshot.params['leagueId'];

    // Obtenemos todos los elegibles necesarios para los desplegables
    // this.tracks$ = this.trackService.getAllTracks();
    // this.categories$ = this.categoryService.getAllCategories();
    // this.scoreSystems$ = this.scoreService.getAllScoreSystems();
  }

  /// Enums ///

  durationTypes = SESSION_LENGTH_TYPE;

  /// Datos basicos ///

  raceCalendar: ChampionshipRound[] = []

  selectedCategories: Category[] = [];

  createChampionshipForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    categories: new FormControl(this.selectedCategories),
    simulator: new FormControl<SimulatorGame | null>(null),
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
    track: new FormControl<Track | null>(null),
    length: new FormGroup({
      value: new FormControl<number | null>(null),
      type: new FormControl<SESSION_DURATION_TYPE | null>(0)
    })
  });

  protected get roundName() {
    return this.championshipRoundForm.get('name') as FormControl;
  }

  protected get roundTrack() {
    return this.championshipRoundForm.get('track') as FormControl<Track | null>;
  }

  protected get roundLength() {
    return this.championshipRoundForm.get('length') as FormControl<RoundLength | null>;
  }

  protected get roundLengthValue() {
    return this.roundLength.get('value') as FormControl<number | null>;
  }

  protected get roundLengthType() {
    return this.roundLength.get('type') as FormControl<SESSION_DURATION_TYPE | null>;
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

  protected searchTracks = (value: string) => {
    this.tracks$ = of();

    if (value.length === 0) return

    this.tracks$ = this.trackService.search({name: value});
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

  selectTrack = (track: Track) => {
    this.roundTrack.setValue(track)
  }

  /// Gestionar las rondas de campeonatos ///

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
    let nameToSet = this.roundName.value || this.roundTrack.value?.name;

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
}

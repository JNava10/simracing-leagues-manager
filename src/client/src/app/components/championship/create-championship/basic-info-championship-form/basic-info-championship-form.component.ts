import { roundDurationTypes } from './../../../../utils/constants/global.constants';
import { Component, Input } from '@angular/core';
import { Track } from '../../../../utils/interfaces/track.interface';
import { Observable, of } from 'rxjs';
import { ChampionshipCreation, RoundDurationType } from '../../../../utils/interfaces/championship.interface';
import { FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
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
import { NgIf, AsyncPipe, NgClass } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CustomSearchInputComponent } from '../../../utils/custom-search-input/custom-search-input.component';
import { C } from '@angular/cdk/keycodes';
import { SESSION_DURATION_TYPE } from '../../../../utils/enums/round.enum';

@Component({
  selector: 'app-basic-info-championship-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    DropdownModule,
    AsyncPipe,
    AccordionModule,
    DialogModule,
    CustomSearchInputComponent,
    FormsModule
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
    private route: ActivatedRoute
  ) {}

  @Input() leagueId?: number;

  tracks$!: Observable<DefaultRes<Track[]>>;
  categories$!: Observable<DefaultRes<Category[]>>;
  scoreSystems$!: Observable<ScoreSystem[]>;
  simulators$!:  Observable<DefaultRes<SimulatorGame[]>>;

  ngOnInit() {
    this.leagueId = this.route.snapshot.params['leagueId'];

    // Obtenemos todos los elegibles necesarios para los desplegables
    // this.tracks$ = this.trackService.getAllTracks();
    // this.categories$ = this.categoryService.getAllCategories();
    // this.scoreSystems$ = this.scoreService.getAllScoreSystems();
  }

  /// Enums ///

  durationTypes = SESSION_DURATION_TYPE;

  /// Datos basicos ///

  raceCalendar: Track[] = []

  selectedCategories: Category[] = [];

  addingRace: boolean = false;
  roundTrackSelected?: Track;

  createChampionshipForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    categories: new FormControl(this.selectedCategories),
    simulator: new FormControl<SimulatorGame | null>(null)
  });

  // Duración de cada ronda //

  selectedDurationType = roundDurationTypes[0]
  durationTypeList = roundDurationTypes
  roundDuration = 1;


  get name() {
    return this.createChampionshipForm.get('name')!.value;
  }

  get description() {
    return this.createChampionshipForm.get('description')!.value;
  }

  selectedSimulator?: SimulatorGame

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

  protected saveTrack = (track: Track) => {
    this.raceCalendar.push(track)
  }

  protected deleteTrack = (index: number) => {
    this.raceCalendar.splice(index, 1);
  }

  selectTrack = (track: Track) => {
    this.roundTrackSelected = track
  }

  /// Gestionar las rondas de campeonatos ///

  saveRoundAndContinue = (track: Track) => {
    this.saveTrack(track);
  }

  saveRoundAndClose = (track: Track) => {
    this.saveTrack(track);
    this.addingRace = false;
  }

  /// Gestionar las categorias ///

  toggleCategory = (category: Category, checked: boolean, index: number) => {
    checked ? this.addCategory(category) : this.removeCategory(category)

    console.log(this.selectedCategories)
  }

  private addCategory = (category: Category) => {
    this.selectedCategories.push(category)
  }

  private removeCategory = (category: Category) => {
    const index = this.selectedCategories.findIndex(finding => finding.id === category.id)
    this.selectedCategories.splice(index, 1);
  }
}

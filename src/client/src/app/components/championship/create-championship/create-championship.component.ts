import { SimulatorApiService } from './../../../services/api/simulator-api.service';
import { SimulatorGame } from './../../../utils/interfaces/simulator.interface';
import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ChampionshipCreation} from "../../../utils/interfaces/championship.interface";
import {ChampionshipApiService} from "../../../services/api/championship-api.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {League} from "../../../utils/interfaces/league.interface";
import {CategoryApiService} from "../../../services/api/category-api.service";
import {ScoreApiService} from "../../../services/api/score-api.service";
import {TrackApiService} from "../../../services/api/track-api.service";
import {Track} from "../../../utils/interfaces/track.interface";
import {Category} from "../../../utils/interfaces/category.interface";
import {ScoreSystem} from "../../../utils/interfaces/score.interface";
import {DropdownModule} from "primeng/dropdown";
import {AccordionModule} from "primeng/accordion";
import { DialogModule } from 'primeng/dialog';
import { CreatingChampRoundStates } from '../../../utils/enums/states.enum';
import { CustomSearchInputComponent } from "../../utils/custom-search-input/custom-search-input.component";
import { DefaultRes } from '../../../utils/interfaces/responses/response.interface';
@Component({
  selector: 'app-create-championship',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    DropdownModule,
    AsyncPipe,
    AccordionModule,
    DialogModule,
    CustomSearchInputComponent
],
  templateUrl: './create-championship.component.html',
  styleUrl: './create-championship.component.scss'
})
export class CreateChampionshipComponent implements OnInit {
  constructor(
    private championshipService: ChampionshipApiService,
    private categoryService: CategoryApiService,
    private scoreService: ScoreApiService,
    private simulatorService: SimulatorApiService,
    private trackService: TrackApiService,
    private route: ActivatedRoute
  )  {}

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

  createChampionshipForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    categoryId: new FormControl(0),
    scoreSystemId: new FormControl(0)
  });

  raceCalendar: Track[] = []

  addingRace: boolean = false;
  roundTrackSelected?: Track;
  currentCreatingState: CreatingChampRoundStates = CreatingChampRoundStates.Default; // Es mas sencillo manejar que se muestra en el modal cambiando su estado, en vez de ifs y booleans.

  get name() {
    return this.createChampionshipForm.get('name')!;
  }

  get description() {
    return this.createChampionshipForm.get('description')!;
  }

  createChampionship = () => {
    if (this.createChampionshipForm.invalid) return;

    const championship = this.createChampionshipForm.value as ChampionshipCreation;

    championship.leagueId = this.leagueId!;

    championship.calendarIds = Array.from(this.raceCalendar.values()).map(track => track.id!);

    this.championshipService.createChampionship(championship)
      .subscribe(this.handleCreatingChampionship)
  };

  private handleCreatingChampionship = () => {

  };

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

  /// Gestionar las rondas de campeonatos ///

  private saveRound = (track: Track) => {
    this.raceCalendar.push(track)
  }

  private deleteRound = (index: number) => {
    this.raceCalendar.splice(index, 1);
  }

  selectRoundTrack = (track: Track) => {
    this.roundTrackSelected = track
  }

  saveRoundAndContinue = (track: Track) => {
    this.saveRound(track);
  }

  saveRoundAndClose = (track: Track) => {
    this.saveRound(track);
    this.addingRace = false;
  }
}

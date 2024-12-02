import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgIf, AsyncPipe, NgClass, SlicePipe } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';

import { Category } from '../../../../utils/interfaces/category.interface';
import { Track, TrackLayout } from '../../../../utils/interfaces/track.interface';
import { LeagueChampionship, ChampionshipRound, RoundLength, RoundDurationType, ChampionshipPreset } from '../../../../utils/interfaces/championship.interface';
import { ScoreSystem } from '../../../../utils/interfaces/score.interface';
import { DefaultRes } from '../../../../utils/interfaces/responses/response.interface';
import { SimulatorGame } from '../../../../utils/interfaces/simulator.interface';

import { GlobalHelper } from './../../../../helpers/global.helper';
import { roundDurationTypes } from './../../../../utils/constants/global.constants';
import { ChampFormStates } from '../../../../utils/enums/states.enum';
import { SESSION_DURATION_TYPE, SESSION_DURATION_TYPE as SESSION_LENGTH_TYPE } from '../../../../utils/enums/round.enum';
import { Errors } from '../../../../utils/enums/errors.enum';

import { ChampionshipApiService } from '../../../../services/api/championship-api.service';
import { CategoryApiService } from '../../../../services/api/category-api.service';
import { ScoreApiService } from '../../../../services/api/score-api.service';
import { SimulatorApiService } from '../../../../services/api/simulator-api.service';
import { TrackApiService } from '../../../../services/api/track-api.service';

import { CustomSearchInputComponent } from '../../../utils/custom/input/custom-search-input/custom-search-input.component';
import { CustomTextInputComponent } from '../../../utils/custom/input/custom-text-input/custom-text-input.component';
import { SimSearchFormComponent } from '../../../utils/search/sim-search-form/sim-search-form.component';
import { CategorySearchFormComponent } from '../../../utils/search/category-search-form/category-search-form.component';
import { CustomBadgeComponent } from '../../../utils/custom/badge/custom-badge.component';
import { RoundListComponent } from '../../round-list/round-list.component';
import { LoginComponent } from '../../../auth/login/login.component';
import { CustomSelectComponent } from '../../../utils/custom/input/custom-select/custom-select.component';
import { CustomSolidButtonComponent } from '../../../utils/button/solid-button/custom-solid-button.component';
import { TrackSearchFormComponent } from '../../../utils/forms/track-search-form/track-search-form.component';

@Component({
  selector: 'app-basic-info-championship-form',
  standalone: true,
  imports: [
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
    CustomSolidButtonComponent,
  ],
  templateUrl: './basic-info-championship-form.component.html',
  styleUrl: './basic-info-championship-form.component.scss'
})
export class BasicInfoChampionshipFormComponent implements OnInit {
  @Input() leagueId?: number;
  @Input() preset?: ChampionshipPreset;
  @Input() championship?: LeagueChampionship;

  @Output() protected basicDataCreated = new EventEmitter<LeagueChampionship>();

  protected tracks!: Track[];
  protected categories$!: Observable<DefaultRes<Category[]>>;
  protected simulators$!: Observable<DefaultRes<SimulatorGame[]>>;

  protected durationTypes = SESSION_LENGTH_TYPE;
  protected durationTypeList = roundDurationTypes;

  raceCalendar: ChampionshipRound[] = [];
  selectedCategories: Map<number, Category> = new Map();
  championshipForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  championshipRoundForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null),
    layout: new FormControl<TrackLayout | null>(null),
    length: new FormGroup({
      value: new FormControl<number | null>(null),
      type: new FormControl<SESSION_DURATION_TYPE | null>(0)
    })
  });

  selectedSimulator?: SimulatorGame;
  protected addingRace: boolean = false;
  protected addingCategory = false;
  protected roundTrackSelected?: Track;
  protected roundCreating: ChampionshipRound = {};

  private layoutsSearched = false;

  constructor(
    private categoryService: CategoryApiService,
    private simulatorService: SimulatorApiService,
    private trackService: TrackApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.leagueId = this.route.snapshot.params['leagueId'];

    if (this.championship) {
      this.applyChampData(this.championship);
    } else if (this.preset) {
      this.convertDataFromApi(this.preset);
    }
  }

  get name() {
    return this.championshipForm.get('name')!.value;
  }

  get description() {
    return this.championshipForm.get('description')!.value;
  }

  protected get roundName() {
    return this.championshipRoundForm.get('name') as FormControl;
  }

  protected get roundLayout() {
    return this.championshipRoundForm.get('layout') as FormControl<TrackLayout | undefined>;
  }

  protected get roundLength() {
    return this.championshipRoundForm.get('length') as FormControl<RoundLength | undefined>;
  }

  convertDataFromApi(preset: ChampionshipPreset) {
    preset.calendar.forEach(layout => {
      this.raceCalendar.push({
        name: layout.name,
        layout: layout
      });
    });

    this.selectedSimulator = preset.simulator;
  }

  private applyChampData(championship: LeagueChampionship) {
    this.championshipForm.patchValue({
      name: championship.name,
      description: championship.description
    });

    if (championship.categories) {
      championship.categories.forEach(category => {
        if (category && category.id) this.selectedCategories.set(category.id, category);
      })
    }

    this.raceCalendar = championship.calendar!;
  }

  protected searchCategories(value: string) {
    this.categories$ = value.length ? this.categoryService.search({ name: value }) : of();
  }

  protected searchSimulator(value: string) {
    this.simulators$ = value.length ? this.simulatorService.search({ name: value }) : of();
  }

  protected searchTrackLayouts(value: string) {
    if (value.length) {
      this.layoutsSearched = true;
      this.trackService.searchLayouts({ name: value }).subscribe(res => (this.tracks = res));
    }
  }

  protected saveRound() {
    this.setRoundName();
    const round = this.championshipRoundForm.value as ChampionshipRound;
    this.raceCalendar.push(round);
    this.championshipRoundForm.reset();
  }

  protected deleteTrack(index: number) {
    this.raceCalendar.splice(index, 1);
  }

  showAddRace() {
    this.addingRace = true;
  }

  selectLayout(layout: TrackLayout, track: Track) {
    layout.parent = track;
    this.roundLayout.setValue(layout);
  }

  getRoundLayoutName() {
    return `${this.roundLayout.value?.parent?.name} - ${this.roundLayout.value?.name}`;
  }

  saveRoundAndContinue() {
    this.saveRound();
  }

  saveRoundAndClose() {
    this.saveRound();
    this.addingRace = false;
  }

  private setRoundName() {
    const nameToSet = this.roundName.value || this.getRoundLayoutName();
    this.roundName.setValue(nameToSet);
  }

  toggleCategory(category: Category, checked: boolean) {
    checked ? this.addCategory(category) : this.removeCategory(category);
  }

  private addCategory = (category: Category) => {
    category.id = this.selectedCategories.size + 1
    this.selectedCategories.set(category.id, category);
  };

  private removeCategory = (category: Category) => {
    if (!category.id) throw new Error('No se ha encontrado la categoria a borrar')

    this.selectedCategories.delete(category.id);
  };

  protected goToNextPage = () => {
    const championship = this.championshipForm.value as LeagueChampionship;
    championship.leagueId = this.leagueId;
    championship.calendar = this.raceCalendar;

    championship.calendar.forEach(entry => {
      entry.layoutId = entry.layout?.id;
      entry.layout = undefined;
    });

    championship.categories = [];
    this.selectedCategories.forEach(item => championship.categories?.push(item));
    championship.simulatorId = this.selectedSimulator?.id;

    this.basicDataCreated.emit(championship);
  };

  confirmCategory = ($event: Category) => {
    this.addCategory($event)
    this.addingCategory = false;
  };

  showAddCategory = () => {
    this.addingCategory = true;
  };

  deleteCategory = (id: number) => {
    this.selectedCategories.delete(id);
  };
}

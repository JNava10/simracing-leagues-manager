import {Component, OnInit} from '@angular/core';
import {CustomTextInputComponent} from "../../utils/custom/input/custom-text-input/custom-text-input.component";
import {Form, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomDropdownComponent} from "../../utils/dropdown/custom-dropdown/custom-dropdown.component";
import {CustomDropdownItemComponent} from "../../utils/dropdown/custom-dropdown-item/custom-dropdown-item.component";
import {CustomSelectComponent} from "../../utils/custom/input/custom-select/custom-select.component";
import {StrategyApiService} from "../../../services/api/strategy-api.service";
import {TrackApiService} from "../../../services/api/track-api.service";
import {BaselineCar, Strategy} from "../../../utils/interfaces/strategy.interface";
import {StrategyLayout, StrategyTrack, Track, TrackLayout} from "../../../utils/interfaces/track.interface";
import {CustomSearchInputComponent} from "../../utils/custom/input/custom-search-input/custom-search-input.component";
import {BaseChartDirective} from "ng2-charts";
import {StrategyChartComponent} from "../strategy-chart/strategy-chart.component";
import {Router} from "@angular/router";
import {CustomEmptyComponent} from "../../utils/custom/custom-empty/custom-empty.component";
import {SoftButtonComponent} from "../../utils/button/soft-button/soft-button.component";
import {CategorySearchFormComponent} from "../../utils/search/category-search-form/category-search-form.component";
import {DialogModule} from "primeng/dialog";
import {PrimeTemplate} from "primeng/api";
import {TrackSearchFormComponent} from "../../utils/forms/track-search-form/track-search-form.component";

@Component({
  selector: 'app-define-strategies-form',
  standalone: true,
  imports: [
    CustomTextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomSelectComponent,
    CustomSearchInputComponent,
    StrategyChartComponent,
    CustomEmptyComponent,
    SoftButtonComponent,
    DialogModule,
    PrimeTemplate,
    TrackSearchFormComponent
  ],
  templateUrl: './define-strategies-form.component.html',
  styleUrl: './define-strategies-form.component.scss'
})
export class DefineStrategiesFormComponent implements OnInit {
  constructor(private router: Router, private strategyService: StrategyApiService, private trackService: TrackApiService, private fb: FormBuilder) {}

  strategies?: Strategy[]

  ngOnInit(): void {
    this.strategyService.getStrategies().subscribe(strategies => {
      this.strategies = strategies;
    })

    this.setStrategyForm();
  }

  strategyForm?: FormGroup;

  searchCars = (name: string) => {
    this.strategyService.searchCars({name}).subscribe(res => this.handleCarsResponse(res))
  }

  searchTrack = (name: string) => {
    console.log(name)
    this.trackService.searchLayouts({name}).subscribe(res => this.handleTrackResponse(res))
  }

  private handleCarsResponse(res: BaselineCar[]) {
    this.availableCars = res
  }

  private handleTrackResponse(res: StrategyTrack[]) {
    this.availableTracks = res
  }

  private setStrategyForm = () => {
    if (!this.fb) throw new Error('No se ha podido encontrar el Form Builder');

    this.strategyForm = this.fb.group({
      raceLength: [0, [Validators.required]],
      layoutId: [0, Validators.required],
      carId: [0, Validators.required],
      startFuel: [0, [Validators.min(0)]],
      estimatedLapTimes: this.fb.array<FormGroup>([]),
      tyres: this.fb.array<number>([], [Validators.required, Validators.minLength(2)]),
    });
  }

  get raceLength() {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario')

    return this.strategyForm.get('raceLength');
  }

  get layoutId() {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario')
    return this.strategyForm.get('layoutId');
  }

  get carId() {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario')
    return this.strategyForm.get('carId');
  }

  get startFuel() {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario')
    return this.strategyForm.get('startFuel');
  }

  get estimatedLapTimes(): FormArray<FormGroup> {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario')
    return this.strategyForm.get('estimatedLapTimes') as FormArray<FormGroup>;
  }

  get tyres(): FormArray<FormGroup> {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario')

    return this.strategyForm.get('tyres') as FormArray<FormGroup>;
  }

  availableCars?: BaselineCar[]
  availableTracks?: StrategyTrack[]
  selectedCar?: BaselineCar;
  selectedLayout?: TrackLayout;

  searchingTrack = false;
  searchingCar = false;

  confirmLayout($event: TrackLayout) {
    console.log($event);
    this.selectedLayout = $event;
    this.searchingTrack = false
  }

  showSearchTrack = () => {
    this.searchingTrack = true
  };
}

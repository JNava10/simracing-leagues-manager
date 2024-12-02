import {Component, OnInit} from '@angular/core';
import {CustomTextInputComponent} from "../../utils/custom/input/custom-text-input/custom-text-input.component";
import {Form, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomDropdownComponent} from "../../utils/dropdown/custom-dropdown/custom-dropdown.component";
import {CustomDropdownItemComponent} from "../../utils/dropdown/custom-dropdown-item/custom-dropdown-item.component";
import {CustomSelectComponent} from "../../utils/custom/input/custom-select/custom-select.component";
import {StrategyApiService} from "../../../services/api/strategy-api.service";
import {TrackApiService} from "../../../services/api/track-api.service";
import {BaselineCar, CreateStrategyProps, Strategy, Tyre} from "../../../utils/interfaces/strategy.interface";
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
import {BaselineCarSearchComponent} from "../../utils/search/baseline-car-search/baseline-car-search.component";
import {NgStyle} from "@angular/common";
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";

@Component({
  selector: 'app-define-strategies-form',
  standalone: true,
  imports: [
    CustomTextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomSelectComponent,
    StrategyChartComponent,
    CustomEmptyComponent,
    SoftButtonComponent,
    DialogModule,
    PrimeTemplate,
    TrackSearchFormComponent,
    BaselineCarSearchComponent,
    NgStyle,
    CustomSolidButtonComponent
  ],
  templateUrl: './define-strategies-form.component.html',
  styleUrl: './define-strategies-form.component.scss'
})
export class DefineStrategiesFormComponent implements OnInit {
  constructor(private strategyService: StrategyApiService, private trackService: TrackApiService, private fb: FormBuilder) {}

  strategies?: Strategy[];

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
    if (!this.strategyForm) throw new Error('Error al obtener el formulario');

    return this.strategyForm.get('raceLength');
  }

  get layoutId() {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario');
    return this.strategyForm.get('layoutId');
  }

  get carId() {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario');
    return this.strategyForm.get('carId');
  }

  get startFuel() {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario');
    return this.strategyForm.get('startFuel');
  }

  get estimatedLapTimes(): FormArray<FormGroup> {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario');
    return this.strategyForm.get('estimatedLapTimes') as FormArray<FormGroup>;
  }

  get tyres(): FormArray<FormGroup> {
    if (!this.strategyForm) throw new Error('Error al obtener el formulario');

    return this.strategyForm.get('tyres') as FormArray<FormGroup>;
  }

  getTyreControl = (tyre: Tyre) => {
    return this.fb.group({id: tyre.id})
  }

  availableCars?: BaselineCar[];
  availableTracks?: StrategyTrack[];
  selectedCar?: BaselineCar;
  selectedLayout?: TrackLayout;

  searchingTrack = false;
  searchingCar = false;

  confirmLayout(layout: TrackLayout) {
    this.selectedLayout = layout;
    this.searchingTrack = false;

    this.layoutId?.patchValue(layout.id)
  }

  showSearchTrack = () => {
    this.searchingTrack = true;
  };

  confirmCar = ($event: BaselineCar) => {
    this.selectedCar = $event;
    this.searchingCar = false;
    this.carId?.patchValue($event.id)
  };

  showSearchCar = () => {
    this.searchingCar = true;
  };

  choosingTyre = false;

  showChoosingTyre = () => {
    this.choosingTyre = true;
  };

  selectedTyres: Tyre[] = [];

  selectTyre = (tyre: Tyre) => {
    this.addTyre(tyre);
  };

  private addTyre = (tyre: Tyre) => {
    this.selectedTyres.push(tyre);

    this.tyres.push(
      this.getTyreControl(tyre)
    );

    this.choosingTyre = false;
  }

  getStrategy = () => {
    if (!this.strategyForm) throw new Error('Error al obtener el Formulario');

    const data = this.strategyForm.value as CreateStrategyProps;

    console.log(data)
  };
}

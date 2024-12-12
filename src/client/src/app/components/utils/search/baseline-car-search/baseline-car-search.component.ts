import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomCardComponent} from "../../custom/custom-card/custom-card.component";
import {CustomEmptyComponent} from "../../custom/custom-empty/custom-empty.component";
import {CustomSearchInputComponent} from "../../custom/input/custom-search-input/custom-search-input.component";
import {CustomSolidButtonComponent} from "../../button/solid-button/custom-solid-button.component";
import {Track, TrackLayout} from "../../../../utils/interfaces/track.interface";
import {StrategyApiService} from "../../../../services/api/strategy-api.service";
import {BaselineCar} from "../../../../utils/interfaces/strategy.interface";

@Component({
  selector: 'app-baseline-car-search',
  standalone: true,
  imports: [
    CustomCardComponent,
    CustomEmptyComponent,
    CustomSearchInputComponent,
    CustomSolidButtonComponent
  ],
  templateUrl: './baseline-car-search.component.html',
  styleUrl: './baseline-car-search.component.scss'
})
export class BaselineCarSearchComponent {
  constructor(private strategyApiService: StrategyApiService) {}

  @Input() showLabel = false;
  @Input() showButtons = true;

  @Output() public onConfirm = new EventEmitter<BaselineCar>();

  protected cars!: BaselineCar[]
  selectedCar?: BaselineCar;

  protected searchCars = (value: string) => {
    if (value.length === 0) return // TODO: Notificar al usuario.

    this.strategyApiService.searchCars({name: value}).subscribe(res => this.cars = res);
  }

  select = (car: BaselineCar) => {
    this.selectedCar = car;
    this.onConfirm.emit(this.selectedCar);
  }

  removeCurrent() {
    this.selectedCar = undefined;
  }

  confirm() {
    this.onConfirm.emit(this.selectedCar);
  }
}

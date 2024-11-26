import {Component, OnInit} from '@angular/core';
import {CustomTextInputComponent} from "../../utils/custom/input/custom-text-input/custom-text-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomDropdownComponent} from "../../utils/dropdown/custom-dropdown/custom-dropdown.component";
import {CustomDropdownItemComponent} from "../../utils/dropdown/custom-dropdown-item/custom-dropdown-item.component";
import {CustomSelectComponent} from "../../utils/custom/input/custom-select/custom-select.component";
import {StrategyApiService} from "../../../services/api/strategy-api.service";
import {TrackApiService} from "../../../services/api/track-api.service";
import {BaselineCar} from "../../../utils/interfaces/strategy.interface";
import {StrategyLayout, Track} from "../../../utils/interfaces/track.interface";

@Component({
  selector: 'app-define-strategies-form',
  standalone: true,
  imports: [
    CustomTextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomDropdownComponent,
    CustomDropdownItemComponent,
    CustomSelectComponent
  ],
  templateUrl: './define-strategies-form.component.html',
  styleUrl: './define-strategies-form.component.scss'
})
export class DefineStrategiesFormComponent implements OnInit {
  constructor(private strategyService: StrategyApiService, private trackService: TrackApiService) {}

  ngOnInit(): void {
    this.strategyService.getAvailableCars().subscribe(res => this.handleCarsResponse(res))

    this.trackService.getAvailableCars().subscribe(res => this.handleCarsResponse(res))
  }

  private handleCarsResponse(res: BaselineCar[]) {

  }

  private handleTrackResponse(res: StrategyLayout) {

  }

  availableCars?: BaselineCar[]
  availableTracks?: StrategyLayout[]
}

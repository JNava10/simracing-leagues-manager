import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TrackApiService} from "../../../../services/api/track-api.service";
import {Track, TrackLayout} from "../../../../utils/interfaces/track.interface";
import {Observable, of} from "rxjs";
import {DefaultRes} from "../../../../utils/interfaces/responses/response.interface";
import {SimulatorApiService} from "../../../../services/api/simulator-api.service";
import {SimulatorGame} from "../../../../utils/interfaces/simulator.interface";
import {AsyncPipe, NgIf} from "@angular/common";
import {CustomSolidButtonComponent} from "../../button/solid-button/custom-solid-button.component";
import {CustomCardComponent} from "../../custom/custom-card/custom-card.component";
import {CustomEmptyComponent} from "../../custom/custom-empty/custom-empty.component";
import {CustomSearchInputComponent} from "../../custom/input/custom-search-input/custom-search-input.component";

@Component({
  selector: 'app-sim-search-form',
  standalone: true,
  imports: [
    AsyncPipe,
    CustomSolidButtonComponent,
    CustomCardComponent,
    CustomEmptyComponent,
    CustomSearchInputComponent,
    NgIf
  ],
  templateUrl: './sim-search-form.component.html',
})
export class SimSearchFormComponent {
  constructor(private simulatorService: SimulatorApiService) {}

  @Output() public onConfirm = new EventEmitter<SimulatorGame>();

  protected sims$!: Observable<DefaultRes<SimulatorGame[]>>;

  @Input() public selected?: SimulatorGame;
  @Input() public showConfirm = true;
  @Input() public showCancel = true;
  @Input() public showButtons = true;

  protected search = (value: string) => {
    this.sims$ = of();

    if (value.length === 0) return;

    this.sims$ = this.simulatorService.search({name: value});
  }

  selectLayout = (simulator: SimulatorGame) => {
    this.selected = simulator;

    this.onConfirm.emit(this.selected);
  }

  removeCurrentLayout() {
    this.selected = undefined;
  }

  confirmLayout() {
    this.selected = undefined;
    this.onConfirm.emit(this.selected);
  }
}

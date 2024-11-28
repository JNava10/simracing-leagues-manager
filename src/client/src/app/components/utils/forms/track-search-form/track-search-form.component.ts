import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CustomSearchInputComponent} from "../../custom/input/custom-search-input/custom-search-input.component";
import {Observable, of} from "rxjs";
import {TrackApiService} from "../../../../services/api/track-api.service";
import {DefaultRes} from "../../../../utils/interfaces/responses/response.interface";
import {Track, TrackLayout} from "../../../../utils/interfaces/track.interface";
import {CustomEmptyComponent} from "../../custom/custom-empty/custom-empty.component";
import {CustomCardComponent} from "../../custom/custom-card/custom-card.component";
import {CustomButtonComponent} from "../../custom/input/custom-button/custom-button.component";

@Component({
  selector: 'app-track-search-form',
  standalone: true,
  imports: [
    AsyncPipe,
    CustomSearchInputComponent,
    CustomEmptyComponent,
    CustomCardComponent,
    CustomButtonComponent
  ],
  templateUrl: './track-search-form.component.html',
})
export class TrackSearchFormComponent {
  constructor(private trackService: TrackApiService) {}


  @Output() public onConfirmLayout = new EventEmitter<TrackLayout>();

  protected tracks!: Track[]

  selectedLayout?: TrackLayout;

  protected searchTrackLayouts = (value: string) => {
    if (value.length === 0) return // TODO: Notificar al usuario.

    this.trackService.searchLayouts({name: value}).subscribe(res => this.tracks = res);
  }

  selectLayout = (track: Track, layout: TrackLayout) => {
    this.selectedLayout = layout;

    this.selectedLayout.parent = track; // Esto servirá para mostrar el circuito al que pertenece el trazado.

    this.onConfirmLayout.emit(this.selectedLayout);
  }


  removeCurrentLayout() {
    this.selectedLayout = undefined;
  }

  confirmLayout() {
    this.selectedLayout = undefined;
    this.onConfirmLayout.emit(this.selectedLayout);
  }
}

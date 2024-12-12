import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {CustomSolidButtonComponent} from "../../button/solid-button/custom-solid-button.component";
import {CustomCardComponent} from "../../custom/custom-card/custom-card.component";
import {CustomEmptyComponent} from "../../custom/custom-empty/custom-empty.component";
import {CustomSearchInputComponent} from "../../custom/input/custom-search-input/custom-search-input.component";
import {SimulatorApiService} from "../../../../services/api/simulator-api.service";
import {SimulatorGame} from "../../../../utils/interfaces/simulator.interface";
import {Observable, of} from "rxjs";
import {DefaultRes} from "../../../../utils/interfaces/responses/response.interface";
import {Category} from "../../../../utils/interfaces/category.interface";
import {CategoryApiService} from "../../../../services/api/category-api.service";
import {style} from "@angular/animations";

@Component({
  selector: 'app-category-search-form',
  standalone: true,
  imports: [
    AsyncPipe,
    CustomSolidButtonComponent,
    CustomCardComponent,
    CustomEmptyComponent,
    CustomSearchInputComponent,
    NgIf,
    NgClass,
  ],
  templateUrl: './category-search-form.component.html',
  styleUrl: './category-search-form.component.scss'
})
export class CategorySearchFormComponent {
  constructor(private categoryService: CategoryApiService) {}

  @Output() public onConfirm = new EventEmitter<Category>();

  protected categories$!: Observable<DefaultRes<Category[]>>;

  @Input() public selected?: Category;
  @Input() public showConfirm = true;
  @Input() public showCancel = true;
  @Input() showButtons = true;
  @Input() styleClass = ""

  protected search = (value: string) => {
    this.categories$ = of();

    if (value.length === 0) return;

    this.categories$ = this.categoryService.search({name: value});
  }

  selectItem = (simulator: Category) => {
    this.selected = simulator;
  }

  cancel() {
    this.selected = undefined;
  }

  confirm() {
    this.onConfirm.emit(this.selected);
    this.selected = undefined;
    this.categories$ = of()
  }
}

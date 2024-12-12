import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html'
})
export class TooltipComponent {
  @Input() text = "";
}

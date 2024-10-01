import {Component} from '@angular/core';
import { CreatingChampRoundStates } from '../../../utils/enums/states.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { BasicInfoChampionshipFormComponent } from "./basic-info-championship-form/basic-info-championship-form.component";

@Component({
  selector: 'app-create-championship',
  standalone: true,
  imports: [BasicInfoChampionshipFormComponent],
  templateUrl: './create-championship.component.html',
  styleUrl: './create-championship.component.scss'
})
export class CreateChampionshipComponent {

  creatingStates = CreatingChampRoundStates; // Hay que crear una variable si queremos usar un enum en el HTML. De lo contrario no funcionará.

  currentCreatingState: CreatingChampRoundStates = CreatingChampRoundStates.CreatingBasicInfo; // Es mas sencillo manejar que se muestra en el modal cambiando su estado, en vez de ifs y booleans.

  champsionshipInfoForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    categoryId: new FormControl(0),
    simulatorId: new FormControl(0),
  });

}

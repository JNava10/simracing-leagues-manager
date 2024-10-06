import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-championship-teams-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './championship-teams-form.component.html',
  styleUrl: './championship-teams-form.component.scss'
})
export class ChampionshipTeamsFormComponent {

  constructor() {}

  // Por algún motivo, no se puede inicializar FormBuilder desde el constructor sin crear dentro el formulario.
  // Mejor hacerlo de esta forma.
  private formBuilder = inject(FormBuilder);

  /// Equipos ///

  teamsForm = this.formBuilder.control('')


  goToNextPage() {
    throw new Error('Method not implemented.');
  }

}

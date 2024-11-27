import { GlobalHelper } from './../../../helpers/global.helper';
import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Observable } from 'rxjs';
import { League } from '../../../utils/interfaces/league.interface';
import { AsyncPipe } from '@angular/common';
import { F, L } from '@angular/cdk/keycodes';
import { FormsModule } from '@angular/forms';
import { LeagueApiService } from '../../../services/api/league-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search-leagues-bar',
  standalone: true,
  imports: [DialogModule, AsyncPipe, FormsModule],
  templateUrl: './search-leagues-bar.component.html',
  styleUrl: './search-leagues-bar.component.css'
})
export class SearchLeaguesBarComponent {

  constructor(private leagueService: LeagueApiService, private messageService: MessageService, private globalHelper: GlobalHelper) {}

  results$?: Observable<League[]>
  leagueChoosed?: League

  searching = false; // Indica que hemos clickado en "Buscar liga".
  choosingLeague = false; // Indica que se ha querido elegir una liga, para mostrar el modál en donde eliges aceptas mandar la peticion de entrar.
  search = ""
  searchTimeout: any; // Este timeout manejará cuando mandar la petición de busqueda a la API.

  chooseLeague = (league: League) => {
    this.leagueChoosed = league;
    this.searching = false;
    this.choosingLeague = true;
  }

  enterLeague = () => {
    this.leagueService.sendEnterLeagueRequest(this.leagueChoosed?.id!).subscribe((data) => {
      if (data.executed) {
        // TODO: Mover a servicio.
        this.globalHelper?.showSuccessMessage({message: "Se ha entrado enviado petición correctamente"})

      } else {
        this.globalHelper.showErrorMessage('Error', data.msg)
      }

      this.choosingLeague = false;
    })
  }

  handleSearching = ($event: KeyboardEvent) => {
    // Borramos el timeout anterior, si es que existia antes.
    clearTimeout(this.searchTimeout);

    // Esperamos 1 segundo a que el usuario deje de escribir. Si no,
    // se volverá a entrar a esta funcion, por tanto, se creará de nuevo
    // el timeout. Fuente: https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript
    this.searchTimeout = setTimeout(() => this.searchLeagues(), 800)
  }

  searchLeagues = () => {
    this.results$ = this.leagueService.searchLeagueByName(this.search)
  }
}

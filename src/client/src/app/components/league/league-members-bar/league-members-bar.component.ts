import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";
import {ImageComponent} from "../../utils/images/rounded-images/image.component";
import {TooltipComponent} from "../../utils/tooltip/tooltip.component";
import {tooltipClasses} from "../../../utils/constants/global.constants";
import {User} from "../../../utils/interfaces/user.interface";
import {LeagueApiService} from "../../../services/api/league-api.service";
import {ActivatedRoute} from "@angular/router";
import {LeagueMember} from "../../../utils/interfaces/league.interface";

@Component({
  selector: 'app-league-members-bar',
  standalone: true,
  imports: [
    CustomSolidButtonComponent,
    ImageComponent,
    TooltipComponent
  ],
  templateUrl: './league-members-bar.component.html',
  styleUrl: './league-members-bar.component.scss'
})
export class LeagueMembersBarComponent implements OnInit, OnChanges {

  constructor(private leagueService: LeagueApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.leagueId) throw new Error("No se ha encontrado ningun id de liga.");

    this.leagueService.getMembers(this.leagueId).subscribe(this.handleMembers)
  }

  // POST ENTREGA: Para que se refresque el cambio de liga desde el mismo comp. sin recargar.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['leagueId'] && this.leagueId) {
      this.leagueService.getMembers(this.leagueId).subscribe(this.handleMembers)
    }
  }

  members?: LeagueMember[];
  @Input() leagueId?: number;

  private handleMembers = (res: LeagueMember[]) => {
    this.members = res
  }
}

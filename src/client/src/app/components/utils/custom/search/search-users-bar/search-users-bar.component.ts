import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";
import {Observable} from "rxjs";
import {League} from "../../../../../utils/interfaces/league.interface";
import {User} from "../../../../../utils/interfaces/user.interface";
import {UserApiService} from "../../../../../services/api/user-api.service";
import {CustomSearchInputComponent} from "../../input/custom-search-input/custom-search-input.component";
import {CustomButtonComponent} from "../../input/custom-button/custom-button.component";
import {LoginComponent} from "../../../../auth/login/login.component";

@Component({
  selector: 'app-search-users-bar',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    CustomSearchInputComponent,
  ],
  templateUrl: './search-users-bar.component.html',
})
export class SearchUsersBarComponent {
  constructor(private userService: UserApiService) {}

  choosed?: User
  searching = false;
  searchedUsers: User[] = [];
  choosing = false;

  @Output() onUserSelect: EventEmitter<User> = new EventEmitter();

  choose = (user: User) => {
    this.choosed = user;
    this.searching = false;
    this.choosing = true;
  }

  selectUser(user: User) {
    this.onUserSelect.emit(user);
  }

  searchUsers(search: string) {
    this.userService.searchByNick(search).subscribe(
      (users) => this.handleSearchedUsers(users),
    );
  }

  private handleSearchedUsers = (users: User[]) => {
    console.log(users)

    this.searchedUsers = users;
  }
}

import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {CustomAvatarComponent} from "../../utils/custom/custom-avatar/custom-avatar.component";
import {CustomSolidButtonComponent} from "../../utils/button/solid-button/custom-solid-button.component";
import {User} from "../../../utils/interfaces/user.interface";
import {ActivatedRoute} from "@angular/router";
import {UserApiService} from "../../../services/api/user-api.service";
import {CustomTextInputComponent} from "../../utils/custom/input/custom-text-input/custom-text-input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [
    CustomAvatarComponent,
    CustomSolidButtonComponent,
    CustomTextInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserApiService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];

    if (!this.userId) return;

    this.userService.getById(this.userId!).subscribe(res => this.handleUser(res));

  }

  fb = inject(FormBuilder);

  coverImage = 'https://pagedone.io/asset/uploads/1705473378.png';
  avatarImage = 'https://pagedone.io/asset/uploads/1705471668.png';
  fullname = 'Emma Smith';
  nickname = 'Los Angeles, California';


  private userId?: number;
  protected user?: User;

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', Validators.required]
  });

  @Output() editProfile = new EventEmitter<void>();

  onEditProfile = () => {
    this.editProfile.emit();
  };

  private handleUser = (user: User) => {
    this.user = user;
  }

  protected getFullname = () => {
    return `${this.user?.name} ${this.user?.lastname} ${this.user?.secondLastname}`
  };

  changePassword() {

  }
}

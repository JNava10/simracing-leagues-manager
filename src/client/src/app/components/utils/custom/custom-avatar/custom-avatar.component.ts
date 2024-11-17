import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-avatar',
  standalone: true,
  imports: [],
  templateUrl: './custom-avatar.component.html',
  styleUrl: './custom-avatar.component.scss'
})
export class CustomAvatarComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.sizes[this.size])
  }
  sizes = AvatarSize;
  @Input() size:  keyof typeof AvatarSize ="M";
  @Input() url = "";

}

export enum AvatarSize {
  S,
  M,
  L,
  XL
}

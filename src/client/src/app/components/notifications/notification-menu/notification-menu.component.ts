import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-menu',
  standalone: true,
  imports: [],
  templateUrl: './notification-menu.component.html',
})
export class NotificationMenuComponent {
  notifications: Notification[] = [];
}

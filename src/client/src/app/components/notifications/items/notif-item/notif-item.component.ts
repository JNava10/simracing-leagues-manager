import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notif-item',
  standalone: true,
  imports: [],
  templateUrl: './notif-item.component.html',
})
export class NotifItemComponent {
  @Input() title: string = 'Titulo';
  @Input() message: string = 'Notificación generica.';
  @Input() icon: string = 'fa-bell';
}

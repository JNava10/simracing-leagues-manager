import {Component, OnInit} from '@angular/core';
import {themeKey} from "../../../utils/constants/storage.constants";
import {Theme} from "../../../utils/enums/tailwind.enum";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-mode-switch',
  standalone: true,
  imports: [
    ToggleButtonModule,
    FormsModule
  ],
  templateUrl: './mode-switch.component.html',
  styleUrl: './mode-switch.component.scss'
})
export class ModeSwitchComponent implements OnInit {
  ngOnInit(): void {
      this.currentTheme = localStorage.getItem(themeKey) || Theme.Dark;
  }

  isLight: boolean = false;

  switchTheme(): void {
    const theme = this.isLight ? Theme.Light : Theme.Dark;
    localStorage.setItem(themeKey, theme);

    document.documentElement.classList.toggle(Theme.Dark);
    document.documentElement.classList.toggle(Theme.Light);
  }

  currentTheme?: string
}

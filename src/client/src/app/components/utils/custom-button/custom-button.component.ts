import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChampionshipPreset } from '../../../utils/interfaces/championship.interface';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
  // TODO: Componente o clase generica con atributos y eventos de todos los inputs HTML.

  @Input() styleClass: string = '';
  @Input() themeName!: keyof typeof ButtonTheme; // Con keyof se obtienen las palabras clave del enum. Es mas comodo usarlo para evitar ponerlos a mano.

  themes = ButtonTheme;
}


// TODO: Quizá mover esto a otro archivo, aunque así considero que está bien organizado de momento.
export enum ButtonTheme {
  red = "bg-red-100 text-red-800 hover:bg-red-200 focus:outline-none focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20",
  blue = "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20",
  green = "bg-green-100 text-green-800 hover:bg-green-200 focus:outline-none focus:bg-green-200 disabled:opacity-50 disabled:pointer-events-none dark:text-green-500 dark:bg-green-800/30 dark:hover:bg-green-800/20 dark:focus:bg-green-800/20",
  yellow = "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:bg-yellow-200 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500 dark:bg-yellow-800/30 dark:hover:bg-yellow-800/20 dark:focus:bg-yellow-800/20",
  purple = "bg-purple-100 text-purple-800 hover:bg-purple-200 focus:outline-none focus:bg-purple-200 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:bg-purple-800/30 dark:hover:bg-purple-800/20 dark:focus:bg-purple-800/20",
  pink = "bg-pink-100 text-pink-800 hover:bg-pink-200 focus:outline-none focus:bg-pink-200 disabled:opacity-50 disabled:pointer-events-none dark:text-pink-500 dark:bg-pink-800/30 dark:hover:bg-pink-800/20 dark:focus:bg-pink-800/20",
  indigo = "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 focus:outline-none focus:bg-indigo-200 disabled:opacity-50 disabled:pointer-events-none dark:text-indigo-500 dark:bg-indigo-800/30 dark:hover:bg-indigo-800/20 dark:focus:bg-indigo-800/20",
  gray = "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-500 dark:bg-gray-800/30 dark:hover:bg-gray-800/20 dark:focus:bg-gray-800/20",
  orange = "bg-orange-100 text-orange-800 hover:bg-orange-200 focus:outline-none focus:bg-orange-200 disabled:opacity-50 disabled:pointer-events-none dark:text-orange-500 dark:bg-orange-800/30 dark:hover:bg-orange-800/20 dark:focus:bg-orange-800/20",
  teal = "bg-teal-100 text-teal-800 hover:bg-teal-200 focus:outline-none focus:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:text-teal-500 dark:bg-teal-800/30 dark:hover:bg-teal-800/20 dark:focus:bg-teal-800/20",
  lime = "bg-lime-100 text-lime-800 hover:bg-lime-200 focus:outline-none focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-lime-500 dark:bg-lime-800/30 dark:hover:bg-lime-800/20 dark:focus:bg-lime-800/20",
  amber = "bg-amber-100 text-amber-800 hover:bg-amber-200 focus:outline-none focus:bg-amber-200 disabled:opacity-50 disabled:pointer-events-none dark:text-amber-500 dark:bg-amber-800/30 dark:hover:bg-amber-800/20 dark:focus:bg-amber-800/20",
  emerald = "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 focus:outline-none focus:bg-emerald-200 disabled:opacity-50 disabled:pointer-events-none dark:text-emerald-500 dark:bg-emerald-800/30 dark:hover:bg-emerald-800/20 dark:focus:bg-emerald-800/20",
  cyan = "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 focus:outline-none focus:bg-cyan-200 disabled:opacity-50 disabled:pointer-events-none dark:text-cyan-500 dark:bg-cyan-800/30 dark:hover:bg-cyan-800/20 dark:focus:bg-cyan-800/20",
  rose = "bg-rose-100 text-rose-800 hover:bg-rose-200 focus:outline-none focus:bg-rose-200 disabled:opacity-50 disabled:pointer-events-none dark:text-rose-500 dark:bg-rose-800/30 dark:hover:bg-rose-800/20 dark:focus:bg-rose-800/20",
  violet = "bg-violet-100 text-violet-800 hover:bg-violet-200 focus:outline-none focus:bg-violet-200 disabled:opacity-50 disabled:pointer-events-none dark:text-violet-500 dark:bg-violet-800/30 dark:hover:bg-violet-800/20 dark:focus:bg-violet-800/20",
  fuchsia = "bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200 focus:outline-none focus:bg-fuchsia-200 disabled:opacity-50 disabled:pointer-events-none dark:text-fuchsia-500 dark:bg-fuchsia-800/30 dark:hover:bg-fuchsia-800/20 dark:focus:bg-fuchsia-800/20",
  stone = "bg-stone-100 text-stone-800 hover:bg-stone-200 focus:outline-none focus:bg-stone-200 disabled:opacity-50 disabled:pointer-events-none dark:text-stone-500 dark:bg-stone-800/30 dark:hover:bg-stone-800/20 dark:focus:bg-stone-800/20",
  sky = "bg-sky-100 text-sky-800 hover:bg-sky-200 focus:outline-none focus:bg-sky-200 disabled:opacity-50 disabled:pointer-events-none dark:text-sky-500 dark:bg-sky-800/30 dark:hover:bg-sky-800/20 dark:focus:bg-sky-800/20"
}

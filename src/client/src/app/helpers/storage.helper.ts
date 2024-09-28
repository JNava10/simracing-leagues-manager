import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageHelper {

  constructor() { }

  private prefix = 'lm'

  save = (key: string, value: any)  => {
    localStorage.setItem(`${this.prefix}_${key}`, value);
  }

  get = (key: string)  => {
    return localStorage.getItem(`${this.prefix}_${key}`);
  }

  getObject = (key: string)  => {
    return JSON.parse(localStorage.getItem(key)!) | 0;
  }

  remove = (key: string)  => {
    return localStorage.removeItem(key)
  }

  removeAll = ()  => {
    return localStorage.clear()
  }
}

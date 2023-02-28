import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  public setItem(key: string, value: any): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const value = this.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public removeItem(key: string): void {
    this.localStorage.removeItem(key);
  }
}

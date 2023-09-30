import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE_TOKEN } from 'src/app/tokens/localStorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: WindowLocalStorage['localStorage']) {}

  public setItem<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): unknown {
    const data = this.storage.getItem(key);
    return data !== null ? JSON.parse(data) : null;
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public clearStorage(): void {
    this.storage.clear();
  }
}

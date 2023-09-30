import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { FakeBackendService } from '../fake-backend/fake-backend.service';

@Injectable({
  providedIn: 'root'
})
export class FakeHttpClientService {
  timerValue = 0;

  constructor(private fakeBackendService: FakeBackendService) {}

  public get<T>(url: string, options: {}): Observable<T> {
    return timer(this.timerValue).pipe(switchMap(() => this.fakeBackendService.get(url)));
  }

  public post<T>(url: string, data: any, options?: {}): Observable<any> {
    return timer(this.timerValue).pipe(switchMap(() => this.fakeBackendService.post(url, data)));
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeHttpClientService } from '../fake/fake-http-client/fake-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: FakeHttpClientService) {}

  public get<T>(url: string, options = {}): Observable<T> {
    return this.http.get<T>(url, options);
  }

  public post<T, U>(url: string, data: U): Observable<T> {
    return this.http.post<T>(url, data);
  }
}

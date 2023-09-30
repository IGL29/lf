import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../http/http.service';
import { ICorporateUser } from '~pages/corporate-clients/component/types';
import { SuccessPayload } from '~types/apiPayloads';

@Injectable({
  providedIn: 'root'
})
export class ApiCorporateService {
  private api = environment.api;

  constructor(private http: HttpService) {}

  public postRequest(formData: ICorporateUser): Observable<SuccessPayload> {
    return this.http.post(`${this.api}/corporate`, formData);
  }
}

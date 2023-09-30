import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFeedbackData } from '~components/feedback-form/types';
import { SuccessPayload } from '~types/apiPayloads';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiFeedbackService {
  private api = environment.api;

  constructor(private http: HttpService) {}

  public postFeedback(data: IFeedbackData): Observable<SuccessPayload | Error> {
    return this.http.post(`${this.api}/feedback`, data);
  }
}

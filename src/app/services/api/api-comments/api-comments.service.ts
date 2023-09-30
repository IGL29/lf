import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../http/http.service';
import { IReview } from '~components/review/types';
import { INewReview } from '~components/review-form/types';

@Injectable({
  providedIn: 'root'
})
export class ApiCommentsService {
  private api = environment.api;

  constructor(private http: HttpService) {}

  public getComments(id: number): Observable<IReview[]> {
    return this.http.get(`${this.api}/comments/${id}`);
  }

  public postComment(formData: INewReview): Observable<IReview[]> {
    return this.http.post(`${this.api}/comments`, formData);
  }
}

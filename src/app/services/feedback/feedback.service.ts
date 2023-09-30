import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IFeedbackData } from '~components/feedback-form/types';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private clearFormSubject = new Subject<boolean>();
  private clearForm$ = this.clearFormSubject.asObservable();

  constructor(private StoreService: StoreService) {}

  public submitForm(data: IFeedbackData): void {
    this.StoreService.dispatchPostFeedback(data);
  }

  public getClearFormStream$(): Observable<boolean> {
    return this.clearForm$;
  }

  public getFeedbackIsLoading(): Observable<boolean> {
    return this.StoreService.feedbackIsLoading();
  }

  public doClearForm(): void {
    this.clearFormSubject.next(true);
  }
}

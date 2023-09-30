import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommentsService } from '../comments/comments.service';
import { IReview } from '~components/review/types';
import { ErrorPayload } from '~types/apiPayloads';
import { INewReview } from '~components/review-form/types';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private resetFormSubject = new Subject<true>();
  private resetFormStream$ = this.resetFormSubject.asObservable();

  constructor(private CommentsService: CommentsService) {}

  public requestComments(id: number): void {
    this.CommentsService.requestComments(id);
  }

  public getComments(): Observable<IReview[] | null> {
    return this.CommentsService.getComments();
  }

  public commentsIsLoading(): Observable<boolean> {
    return this.CommentsService.commentsIsLoading();
  }

  public getCommentsError(): Observable<ErrorPayload['error'] | null> {
    return this.CommentsService.getCommentsError();
  }

  public postComment(formData: INewReview): void {
    this.CommentsService.postComment(formData);
  }

  public getResetFormStream(): Observable<true> {
    return this.resetFormStream$;
  }

  public postCommentIsLoading(): Observable<boolean> {
    return this.CommentsService.postCommentLoading();
  }

  public postCommentError(): Observable<ErrorPayload['error'] | null> {
    return this.CommentsService.postCommentError();
  }

  public resetForm(): void {
    this.resetFormSubject.next(true);
  }
}

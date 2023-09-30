import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../store/store.service';
import { commentsStore } from '~pages/product/store/comments';
import { IReview } from '~components/review/types';
import { INewReview } from '~components/review-form/types';
import { ErrorPayload } from '~types/apiPayloads';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private StoreService: StoreService) {}

  public requestComments(id: number): void {
    this.StoreService.dispatchRequestComments(id);
  }

  public getComments(): Observable<IReview[] | null> {
    return this.StoreService.getComments();
  }

  public getCommentsError(): Observable<commentsStore.IState['error']> {
    return this.StoreService.getCommentsError();
  }

  public postComment(formData: INewReview): void {
    this.StoreService.dispatchPostComment(formData);
  }

  public postCommentLoading(): Observable<boolean> {
    return this.StoreService.commentIsLoading();
  }

  public postCommentError(): Observable<ErrorPayload['error'] | null> {
    return this.StoreService.commentError();
  }

  public commentsIsLoading(): Observable<boolean> {
    return this.StoreService.commentsIsLoading();
  }
}

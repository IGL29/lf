import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  postAction,
  postErrorAction,
  postSuccessAction,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './comments.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiCommentsService } from 'src/app/services/api/api-comments/api-comments.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';

@Injectable()
export class CommentsEffects {
  constructor(
    private actions: Actions,
    private apiCommentsService: ApiCommentsService,
    private reviewsService: ReviewsService
  ) {}

  loadComments$ = createEffect(() =>
    this.actions.pipe(
      ofType(requestAction),
      map((action) => action.id),
      switchMap((id) =>
        this.apiCommentsService.getComments(id).pipe(
          map((comments) => requestSuccessAction({ comments })),
          catchError((error) => {
            return of(requestErrorAction({ error }));
          })
        )
      )
    )
  );

  postComment$ = createEffect(() =>
    this.actions.pipe(
      ofType(postAction),
      switchMap(({ data }) =>
        this.apiCommentsService.postComment(data).pipe(
          map(() => {
            this.reviewsService.resetForm();
            return postSuccessAction();
          }),
          catchError((error) => of(postErrorAction({ error })))
        )
      )
    )
  );
}

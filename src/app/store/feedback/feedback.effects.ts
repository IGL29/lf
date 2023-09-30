import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { requestAction, requestErrorAction, requestSuccessAction } from './feedback.actions';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ApiFeedbackService } from 'src/app/services/api/api-feedback/api-feedback.service';

@Injectable()
export class FeedbackEffects {
  constructor(
    private actions$: Actions,
    private apiFeedbackService: ApiFeedbackService,
    private feedbackService: FeedbackService
  ) {}

  postFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAction),
      switchMap((data) =>
        this.apiFeedbackService.postFeedback(data).pipe(
          map(() => {
            this.feedbackService.doClearForm();
            return requestSuccessAction();
          }),
          catchError((error) => of(requestErrorAction({ error })))
        )
      )
    )
  );
}

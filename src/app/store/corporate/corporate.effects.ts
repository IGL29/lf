import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { requestAction, requestErrorAction, requestSuccessAction } from './corporate.actions';
import { ApiCorporateService } from 'src/app/services/api/api-corporate/api-corporate.service';
import { CorporateClientsService } from 'src/app/services/corporate/corporate-clients.service';

@Injectable()
export class CorporateEffects {
  constructor(
    private actions$: Actions,
    private apiCorporateService: ApiCorporateService,
    private corporateClientsService: CorporateClientsService
  ) {}

  postFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAction),
      switchMap((data) =>
        this.apiCorporateService.postRequest(data).pipe(
          map(() => {
            this.corporateClientsService.doClearForm();
            return requestSuccessAction();
          }),
          catchError((error) => of(requestErrorAction({ error })))
        )
      )
    )
  );
}

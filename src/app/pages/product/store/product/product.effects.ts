import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  hydrateAction,
  hydrateErrorAction,
  hydrateSuccessAction,
  noHydrateAction,
  requestAction,
  requestCancelAction,
  requestErrorAction,
  requestSuccessAction
} from './product.actions';
import { catchError, first, map, of, switchMap } from 'rxjs';
import { ApiProductService } from 'src/app/services/api/api-product/api-product.service';
import { Action } from '@ngrx/store';
import { HydrationStoreService } from 'src/app/services/hydration-store.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private apiProductService: ApiProductService,
    private hydrationStoreService: HydrationStoreService
  ) {}

  ngrxOnInitEffects(): Action {
    if (this.hydrationStoreService.isPlatformBrowser) {
      return hydrateAction();
    }
    return noHydrateAction();
  }

  hydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hydrateAction),
      map(() => {
        if (this.hydrationStoreService.isExistTransferedProductStore()) {
          return hydrateSuccessAction({
            payload: this.hydrationStoreService.getTransferProductStore()
          });
        }
        return hydrateErrorAction();
      })
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAction),
      map((action) => action.id),
      switchMap((id) =>
        this.hydrationStoreService.isTransferedProduct().pipe(
          first(),
          map((isTransfer) => ({ isTransfer, id }))
        )
      ),
      switchMap(({ isTransfer, id }) => {
        if (isTransfer) {
          return of(requestCancelAction());
        }
        return this.apiProductService.getProduct(id).pipe(
          map((product) => requestSuccessAction({ product })),
          catchError((error) => {
            return of(requestErrorAction({ error }));
          })
        );
      })
    )
  );

  transferProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestSuccessAction),
        map(() => {
          if (this.hydrationStoreService.isPlatformServer) {
            this.hydrationStoreService.transferProductStore();
          }
        })
      ),
    { dispatch: false }
  );
}

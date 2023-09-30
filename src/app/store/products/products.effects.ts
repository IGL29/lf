import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';

import { catchError, first, map, of, switchMap } from 'rxjs';
import {
  hydrateAction,
  hydrateErrorAction,
  hydrateSuccessAction,
  requestAction,
  requestCancelAction,
  requestErrorAction,
  requestSuccessAction
} from './products.actions';
import { IProduct } from '~types/product';
import { ApiProductService } from 'src/app/services/api/api-product/api-product.service';
import { Action } from '@ngrx/store';
import { HydrationStoreService } from 'src/app/services/hydration-store.service';
import { IS_PLATFORM_SERVER_TOKEN } from 'src/app/tokens/isPlatformServer';

@Injectable()
export class ProductsEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private apiProductsService: ApiProductService,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(IS_PLATFORM_SERVER_TOKEN) private isPlatformServer: (id: string) => boolean,
    private hydrationStoreService: HydrationStoreService
  ) {}

  ngrxOnInitEffects(): Action {
    return hydrateAction();
  }

  hydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hydrateAction),
      map(() => {
        if (this.hydrationStoreService.isExistTransferedProductsStore()) {
          return hydrateSuccessAction({
            payload: this.hydrationStoreService.getTransferProductsStore()
          });
        }
        return hydrateErrorAction();
      })
    )
  );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAction),
      switchMap(() => this.hydrationStoreService.isTransferedProducts().pipe(first())),
      switchMap((isTransfered) => {
        if (isTransfered) {
          return of(requestCancelAction());
        }
        return this.apiProductsService.getProducts().pipe(
          map((products: Array<IProduct>) => requestSuccessAction({ products })),
          catchError((error) => of(requestErrorAction({ error })))
        );
      })
    )
  );

  transferProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(requestSuccessAction),
        map(() => {
          if (this.isPlatformServer(this.platformId)) {
            this.hydrationStoreService.transferProductsStore();
          }
        })
      ),
    { dispatch: false }
  );
}

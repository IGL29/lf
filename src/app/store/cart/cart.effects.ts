import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  clearAllAction,
  deleteProductAction,
  deleteProductErrorAction,
  deleteProductSuccessAction,
  postChangeCountAction,
  postChangeCountErrorAction,
  postChangeCountSuccessAction,
  postProductAction,
  postProductErrorAction,
  postProductSuccessAction,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './cart.actions';
import { ApiCartService } from 'src/app/services/api/api-cart/api-cart.service';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private apiCartService: ApiCartService) {}

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAction),
      switchMap(() =>
        this.apiCartService.getProducts().pipe(
          map((inCart) => requestSuccessAction({ inCart })),
          catchError((error) => of(requestErrorAction({ error })))
        )
      )
    )
  );

  postToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postProductAction),
      map((action) => ({ product: action.product, count: action.count })),
      switchMap((payload) =>
        this.apiCartService.addProduct(payload).pipe(
          map((inCart) => postProductSuccessAction({ inCart })),
          catchError((error) => of(postProductErrorAction({ error })))
        )
      )
    )
  );

  deleteFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductAction),
      map((action) => action.id),
      switchMap((id) =>
        this.apiCartService.deleteProduct(id).pipe(
          map((inCart) => deleteProductSuccessAction({ inCart })),
          catchError((error) => of(deleteProductErrorAction({ error })))
        )
      )
    )
  );

  changeProductCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postChangeCountAction),
      switchMap((action) =>
        this.apiCartService.changeProductCount(action.id, action.count).pipe(
          map((inCart) => postChangeCountSuccessAction({ inCart })),
          catchError((error) => of(postChangeCountErrorAction({ error })))
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearAllAction),
      switchMap(() =>
        this.apiCartService.clearAll().pipe(
          map((inCart) => postChangeCountSuccessAction({ inCart })),
          catchError((error) => of(postChangeCountErrorAction({ error })))
        )
      )
    )
  );
}

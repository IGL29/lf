import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { requestAction, requestErrorAction, requestSuccessAction } from './order.actions';
import { Router } from '@angular/router';
import { ApiOrderService } from 'src/app/services/api/api-order/api-order.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private apiOrderService: ApiOrderService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  submitOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAction),
      switchMap((data) =>
        this.apiOrderService.postOrder(data).pipe(
          map((response: { id: string }) => {
            this.orderService.doClearForm();
            this.cartService.clearAll();
            this.router.navigate(['/order/successful', response.id]);
            return requestSuccessAction(response);
          }),
          catchError((error) => {
            return of(requestErrorAction({ error }));
          })
        )
      )
    )
  );
}

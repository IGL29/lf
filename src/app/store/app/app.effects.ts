import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { startedAction } from './app.actions';
import { map, mergeMap, of } from 'rxjs';
import { productsStore } from '../products';
import { cartStore } from '../cart';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startedAction),
      map(() => productsStore.requestAction()),
      mergeMap((productsAction) => of(productsAction, cartStore.requestAction()))
    )
  );
}

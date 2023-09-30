import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { addAction } from './notifications.actions';
import { corporateStore } from '../corporate';
import { feedbackStore } from '../feedback';
import { orderStore } from '../order';
import { commentsStore } from '~pages/product/store/comments';
import { cartStore } from '../cart';
import { generateRandomString } from '~utils/randomString';

@Injectable()
export class NotificationsEffects {
  constructor(private actions$: Actions) {}

  postFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofType(feedbackStore.requestSuccessAction),
      map(() =>
        addAction({
          notify: {
            title: 'Данные успешно отправлены!',
            type: 'success',
            id: generateRandomString()
          }
        })
      )
    )
  );

  postCorporate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(corporateStore.requestSuccessAction),
      map(() =>
        addAction({
          notify: {
            title: 'Данные успешно отправлены!',
            type: 'success',
            id: generateRandomString()
          }
        })
      )
    )
  );

  postOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderStore.requestSuccessAction),
      map(() =>
        addAction({
          notify: {
            title: 'Данные успешно отправлены!',
            type: 'success',
            id: generateRandomString()
          }
        })
      )
    )
  );

  postComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(commentsStore.postSuccessAction),
      map(() =>
        addAction({
          notify: {
            title: 'Данные успешно отправлены!',
            type: 'success',
            id: generateRandomString()
          }
        })
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartStore.postProductSuccessAction),
      map(() =>
        addAction({
          notify: {
            title: 'Товар добавлен в корзину!',
            type: 'success',
            id: generateRandomString()
          }
        })
      )
    )
  );
}

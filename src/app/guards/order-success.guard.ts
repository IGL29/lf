import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { of } from 'rxjs';

export const orderResolver: ResolveFn<number> = (route: ActivatedRouteSnapshot) => {
  const orderId = Number(route.paramMap.get('id'));
  return of(orderId);
};

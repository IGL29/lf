import { animate, style, transition, trigger } from '@angular/animations';

export const expandAnimation = trigger('expandAnimation', [
  transition(':enter', [
    style({ height: 0 }),
    animate('0.3s', style({ height: '*' })),
  ]),
  transition(':leave', [
    style({ height: '*' }),
    animate('0.3s', style({ height: 0 })),
  ]),
]);

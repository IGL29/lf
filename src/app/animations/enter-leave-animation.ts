import { animate, style, transition, trigger } from '@angular/animations';

export const enterLeaveAnimation = trigger('enterLeaveAnimation', [
  transition(':enter', [style({ opacity: '0' }), animate('0.3s', style({ opacity: '1' }))]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate('0.3s', style({ transform: 'translateX(200%)' }))
  ])
]);

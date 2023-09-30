import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Count } from './types';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartButtonComponent {
  @Input() count: Count;

  get isCountVisible(): boolean {
    return this.count > 0;
  }
}

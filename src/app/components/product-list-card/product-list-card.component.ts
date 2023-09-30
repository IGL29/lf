import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrls: ['./product-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListCardComponent {
  @Input() isLoading: boolean;
  @Input() error: boolean;
  @Output() emitRepeatRequest: EventEmitter<void> = new EventEmitter();

  public repeatRequestProducts() {
    this.emitRepeatRequest.emit();
  }

  get isNotLoading(): boolean {
    return !this.isLoading;
  }
  get isNotError(): boolean {
    return !this.error;
  }
}

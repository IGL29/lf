import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IPrice, IProduct } from 'src/types/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {
  public price: number;

  private _product: IProduct;
  @Input() set product(product: IProduct) {
    this._product = product;
    this.price = this.getProductPrice(product.price);
  }
  get product(): IProduct {
    return this._product;
  }

  @Input() minCount: number;
  @Input() count: number;
  @Output() countChange: EventEmitter<number> = new EventEmitter();
  @Output() emitDeleteFromCart: EventEmitter<number> = new EventEmitter();

  private getProductPrice(price: IPrice): number {
    return price.value - price.discount;
  }

  public onChangeCount(value: number): void {
    this.countChange.emit(value);
  }

  public deleteFromCart(id: number): void {
    this.emitDeleteFromCart.emit(id);
  }
}

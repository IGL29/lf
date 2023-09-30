import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { pageData } from '~pages/catalog/data/pageData';
import { map } from 'rxjs';
import { IProduct } from '~types/product';
import { ErrorPayload } from '~types/apiPayloads';
import { ICartItem } from 'src/app/services/cart-storage/cart-storage.service';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
  public pageData = pageData;
  private width: number;
  @Input() products: IProduct[];
  @Input() isProductsLoading: boolean;
  @Input() productsError: ErrorPayload['error'] | null = null;
  @Output() emitAddToCart: EventEmitter<ICartItem> = new EventEmitter();
  @Output() emitRequestProducts: EventEmitter<void> = new EventEmitter();

  constructor(private vss: ViewportSizeService) {}

  ngOnInit(): void {
    this.subscribeToViewportSize();
  }

  private subscribeToViewportSize(): void {
    this.vss.resizeObservable$
      .pipe(map((sizes) => sizes.width))
      .subscribe((width) => (this.width = width));
  }

  get isMobile(): boolean {
    return this.width <= 768;
  }

  public repeatRequestProducts(): void {
    this.emitRequestProducts.emit();
  }

  public addToCart(cartItem: ICartItem): void {
    this.emitAddToCart.emit(cartItem);
  }

  get isError(): boolean {
    return this.productsError !== null;
  }

  public trackByProductId(_: number, product: IProduct): number {
    return product.id;
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '~types/product';
import { ICartItem } from 'src/app/services/cart-storage/cart-storage.service';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSliderComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  protected countVisibleSlides = 4;
  @Input() products: IProduct[] = [];
  @Input() isLoading: boolean;
  @Output() emitAddToCart: EventEmitter<ICartItem> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef, private vss: ViewportSizeService) {}

  ngOnInit(): void {
    this.subscribeToViewportSize();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  protected addToCart(cartItem: ICartItem): void {
    this.emitAddToCart.emit(cartItem);
  }

  private subscribeToViewportSize(): void {
    this.vss.resizeObservable$.pipe(takeUntil(this.destroySubject)).subscribe((size) => {
      this.countVisibleSlides = size.width > 991 ? 4 : 3;
      this.cdr.markForCheck();
    });
  }

  get productsNotEmpty(): boolean {
    return !!this.products.length;
  }
}

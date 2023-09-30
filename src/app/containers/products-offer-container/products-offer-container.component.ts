import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ICartItem } from 'src/app/services/cart-storage/cart-storage.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { IProduct } from '~types/product';

@Component({
  selector: 'app-products-offer-container',
  templateUrl: './products-offer-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsOfferContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  protected isLoading: boolean;
  protected offerProducts: IProduct[];
  protected width: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscribeToProducts();
    this.subscribeToProductsLoading();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToProducts(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((products) => {
        this.offerProducts = products;
        this.cdr.markForCheck();
      });
  }

  private subscribeToProductsLoading(): void {
    this.productsService
      .productsIsLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.cdr.markForCheck();
      });
  }

  protected addToCart(cartItem: ICartItem): void {
    this.cartService.addToCart(cartItem);
  }
}

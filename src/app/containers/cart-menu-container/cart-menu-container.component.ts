import { enterLeaveAnimation } from '~animations/enter-leave-animation';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { expandAnimation } from 'src/app/animations/expand-animation';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { Subject, map, takeUntil } from 'rxjs';
import { IProduct } from '~types/product';
import { Cart, ICartItem } from 'src/app/services/cart-storage/cart-storage.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsFilterService } from 'src/app/services/products-filter/products-filter.service';

@Component({
  selector: 'app-cart-menu-container',
  templateUrl: './cart-menu-container.component.html',
  styleUrls: ['./cart-menu-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, expandAnimation, enterLeaveAnimation]
})
export class CartMenuContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  private _inCartProducts: Cart = [];
  protected isCartNotEmpty: boolean;
  protected isOfferProductsLoading = false;
  protected cartPrice: number;
  protected minProductCount = 1;

  get inCartProducts(): Cart {
    return this._inCartProducts;
  }
  set inCartProducts(inCartProducts: Cart) {
    this._inCartProducts = inCartProducts;
    this.isCartNotEmpty = inCartProducts.length !== 0;
  }
  protected recommendedProducts: IProduct[];
  @Output() emitCloseMenu: EventEmitter<undefined> = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private productsService: ProductsService,
    private productsFilterService: ProductsFilterService
  ) {}

  ngOnInit(): void {
    this.subscribeToProductsInCart();
    this.subscribeToCartPrice();
    this.subscribeToProducts();
    this.subscribeToProductsLoading();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToCartPrice(): void {
    this.cartService
      .getPrice()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((price) => {
        this.cartPrice = price;
        this.cdr.markForCheck();
      });
  }

  private subscribeToProductsInCart(): void {
    this.cartService
      .getCart()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((inCartProducts) => {
        this.inCartProducts = inCartProducts ? inCartProducts : [];
        this.cdr.markForCheck();
      });
  }

  private subscribeToProducts(): void {
    this.productsService
      .getProducts()
      .pipe(
        takeUntil(this.destroySubject),
        map((products) =>
          products.filter((product) =>
            this.productsFilterService.isHasCategory(product, { category: 'balloon' })
          )
        )
      )
      .subscribe((products) => {
        this.recommendedProducts = products ? products : [];
        this.cdr.markForCheck();
      });
  }

  private subscribeToProductsLoading(): void {
    this.productsService
      .productsIsLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isLoading) => {
        this.isOfferProductsLoading = isLoading;
        this.cdr.markForCheck();
      });
  }

  protected onChangeProductCount(payload: { id: IProduct['id']; count: number }): void {
    if (payload.count < 1) {
      return;
    }
    this.cartService.changeProductCount(payload.id, payload.count);
  }

  protected deleteFromCart(id: number): void {
    this.cartService.deleteFromCart(id);
  }

  protected addToCart(productInCart: { product: IProduct; count: number }): void {
    this.cartService.addToCart(productInCart);
  }

  protected trackByProductId(_: number, cartItem: ICartItem) {
    return cartItem.product.id;
  }

  public closeMenu(): void {
    this.emitCloseMenu.emit();
  }
}

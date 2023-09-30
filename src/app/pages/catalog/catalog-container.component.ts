import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, map } from 'rxjs';
import { distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TIsLoading } from 'src/app/store/products/products.reducer';
import { IProduct } from '~types/product';
import { ErrorPayload } from '~types/apiPayloads';
import { ICartItem } from 'src/app/services/cart-storage/cart-storage.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsFilterService } from 'src/app/services/products-filter/products-filter.service';
import { ProductsSortingService } from 'src/app/services/products-sorting/products-sorting.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Meta } from '@angular/platform-browser';
import { description } from './data/meta';

@Component({
  selector: 'app-catalog-container',
  templateUrl: './catalog-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  private queryParams: Params;
  public products: Array<IProduct>;
  public productsIsLoading: TIsLoading;
  public productsError: ErrorPayload['error'] | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private productsFilterService: ProductsFilterService,
    private productsSortingService: ProductsSortingService,
    private cartService: CartService,
    private meta: Meta
  ) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.subscribeToProducts();
    this.subscribeToProductsLoading();
    this.subscribeToProductsError();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private setMeta(): void {
    this.meta.addTag({
      name: 'description',
      content: description
    });
  }

  private subscribeToProducts(): void {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroySubject),
        distinctUntilChanged(),
        tap((queryParams) => (this.queryParams = queryParams)),
        switchMap(() => this.productsService.getProducts()),
        map((products) =>
          this.productsFilterService.getFilteredProducts(products, this.queryParams)
        ),
        map((products) =>
          this.productsSortingService.sortedProducts(
            products,
            this.queryParams['sort'],
            this.queryParams['target-sort']
          )
        )
      )
      .subscribe((products) => {
        this.products = products;
        this.cdr.markForCheck();
      });
  }

  private subscribeToProductsLoading(): void {
    this.productsService
      .productsIsLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isLoading) => {
        this.productsIsLoading = isLoading;
        this.cdr.markForCheck();
      });
  }

  private subscribeToProductsError(): void {
    this.productsService
      .productsError()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((error) => {
        this.productsError = error;
        this.cdr.markForCheck();
      });
  }

  public repeatRequestProducts(): void {
    this.productsService.requestProducts();
  }

  public addToCart(cartItem: ICartItem): void {
    this.cartService.addToCart(cartItem);
  }
}

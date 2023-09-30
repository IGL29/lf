import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { pageData } from '~pages/main/data/pageData';
import { IProduct } from '~types/product';

@Component({
  selector: 'app-popular-section',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularComponent implements OnInit, OnDestroy {
  public data = pageData.popularBouquets;
  private destroySubject: Subject<null> = new Subject();
  public isSliderVisible: boolean;
  public offerProducts: IProduct[] = [];
  public isLoading: boolean;
  @Output() public emitAddToCart: EventEmitter<number> = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    private vss: ViewportSizeService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.subscribeToViewportSize();
    this.subscribeToProducts();
    this.subscribeToProductsLoading();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToViewportSize(): void {
    this.vss.resizeObservable$
      .pipe(
        takeUntil(this.destroySubject),
        map((sizes) => sizes.width)
      )
      .subscribe((width) => {
        this.isSliderVisible = width > 576;
        this.cdr.markForCheck();
      });
  }

  private subscribeToProducts(): void {
    this.productsService
      .getProducts()
      .pipe(
        takeUntil(this.destroySubject),
        map((products) => products?.slice(0, 3))
      )
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

  public get isProductsNotEmpty(): boolean {
    return this.offerProducts.length !== 0;
  }
}

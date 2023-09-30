import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { TOrientation } from 'src/app/components/slider/slider.component';
import { IProduct } from '~types/product';
import { ProductImages } from './component/types';
import { ErrorPayload } from '~types/apiPayloads';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import { ProductContainerService } from 'src/app/services/product-container/product-container.service';
import { UrlRouteService } from 'src/app/services/url-route/url-route.service';
import { routes } from '~data/routes';
import { Meta, Title } from '@angular/platform-browser';
import { description } from './data/meta';
import { HydrationStoreService } from 'src/app/services/hydration-store.service';
import { pages } from 'src/app/CEO';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null>;
  private productId: number;
  private _product: IProduct | null;
  protected productImages: ProductImages | null = null;
  protected activeIndexProductImage = 0;
  protected previousUrl: string;
  protected previousUrlParams: Params;
  protected sliderOrientation: TOrientation;
  protected offerProductsIsVisible: boolean;
  protected countVisibleSlides = 4;
  protected isPlatformBrowser: boolean;
  protected set product(product: IProduct | null) {
    this._product = product;
    if (!product) {
      return;
    }
    this.productImages = this.createArrayFromImages(product);
  }
  protected get product(): IProduct | null {
    return this._product;
  }
  protected count = 1;
  protected productIsLoading = false;
  protected productError: ErrorPayload['error'] | null;

  constructor(
    private title: Title,
    private meta: Meta,
    private activeRoute: ActivatedRoute,
    private productContainerService: ProductContainerService,
    private vss: ViewportSizeService,
    private cdr: ChangeDetectorRef,
    private urlRouteService: UrlRouteService,
    private hydrationStoreService: HydrationStoreService
  ) {
    this.destroySubject = new Subject();
    this.setMeta();
  }

  ngOnInit(): void {
    this.setPlatform();
    this.subscribeToRouteData();
    this.subscribeToProduct();
    this.subscribeToViewportSizes();
    this.subscribeToPreviousUrl();
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

  private setPlatform(): void {
    this.isPlatformBrowser = this.hydrationStoreService.isPlatformBrowser;
  }

  private subscribeToProduct(): void {
    combineLatest([
      this.productContainerService.getProduct(),
      this.productContainerService.productIsLoading(),
      this.productContainerService.getProductError()
    ])
      .pipe(takeUntil(this.destroySubject))
      .subscribe({
        next: ([product, isLoading, error]) => {
          this.productIsLoading = isLoading;
          this.product = product;
          this.productError = error;
          if (product) {
            this.meta.addTag(this.productContainerService.getKeywordsMeta(product));
            this.title.setTitle(`${product.title} - ${pages.product.title}`);
          }
          this.cdr.markForCheck();
        }
      });
  }

  private subscribeToRouteData(): void {
    this.activeRoute.data
      .pipe(
        takeUntil(this.destroySubject),
        map((data) => data['product'])
      )
      .subscribe((productId) => {
        this.productId = Number(productId);
        this.cdr.markForCheck();
      });
  }

  private subscribeToViewportSizes(): void {
    this.vss.resizeObservable$
      .pipe(
        takeUntil(this.destroySubject),
        map((sizes) => sizes.width)
      )
      .subscribe((width) => {
        this.offerProductsIsVisible = width > 576;
        this.sliderOrientation = width > 992 ? 'vertical' : 'horizontal';
        this.countVisibleSlides = width > 992 ? 3 : 4;
        this.cdr.markForCheck();
      });
  }

  private subscribeToPreviousUrl(): void {
    this.urlRouteService.previousUrlStream$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((previousUrlInfo) => {
        this.previousUrl = previousUrlInfo.url ?? routes.catalog.url;
        this.previousUrlParams = previousUrlInfo.params ?? {};
      });
  }

  protected onChangeCount(value: number): void {
    this.count = value;
  }

  protected repeatRequestProduct(): void {
    this.productContainerService.requestProduct(this.productId);
  }

  protected addToCart(): void {
    if (!this.product) {
      return;
    }
    if (this.count < 1) {
      return;
    }
    this.productContainerService.addToCart({
      product: this.product,
      count: this.count
    });
    this.count = 1;
  }

  protected setActiveImage(index: number) {
    this.activeIndexProductImage = index;
  }

  private createArrayFromImages(product: IProduct): ProductImages | null {
    if (product && product.images.main && product.images?.other.length) {
      return [...product.images.other, product.images.main];
    }
    if (product && product.images?.main) {
      return [product.images.main];
    }
    return null;
  }
}

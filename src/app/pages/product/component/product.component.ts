import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { pageData } from '~pages/product/data/pageData';
import { TOrientation } from 'src/app/components/slider/slider.component';
import {
  CATEGORY_NAME,
  CATEGORY_PARAMS,
  Categories,
  EnumCategories,
  IProduct
} from '~types/product';
import { ProductImages } from './types';
import { ErrorPayload } from '~types/apiPayloads';
import { ICartItem } from 'src/app/services/cart-storage/cart-storage.service';
import { IBreadcrumb } from '~components/breadcrumbs/types';
import { IRouteData, mainRoute, routes } from '~data/routes';
import { Params } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  protected readonly categoryName = CATEGORY_NAME;
  protected readonly enumCategories = EnumCategories;
  protected data = pageData;
  private _product: IProduct;
  protected minCount = 0;
  protected viewportWidth: number;
  protected spaceBetweenSlides: number;
  protected breadcrumbs: IBreadcrumb[] = [];

  @Input() previousUrl: string;
  @Input() previousParams: Params;
  @Input() count = 0;
  @Input() productError: ErrorPayload['error'] | null = null;
  @Input() productIsLoading = false;
  @Input() set product(product: IProduct | null) {
    if (!product) {
      return;
    }
    this._product = product;
    this.generateBreadcrumbs(mainRoute, product.categories[0], product.title);
  }
  public get product() {
    return this._product;
  }
  protected _countVisibleSlides: number;
  @Input() set countVisibleSlides(count: number) {
    this._countVisibleSlides = count;
    this.spaceBetweenSlides = count >= 4 ? 5 : 20;
  }
  @Input() recommendedProducts: IProduct[];
  @Input() activeIndexProductImage: number;
  @Input() productImages: ProductImages | null;
  @Input() sliderOrientation: TOrientation;
  @Input() offerProductsIsVisible: boolean;
  @Input() isPlatformBrowser: boolean;
  @Output() emitAddToCart: EventEmitter<ICartItem> = new EventEmitter();
  @Output() emitRequestProduct: EventEmitter<undefined> = new EventEmitter();
  @Output() countChange: EventEmitter<number> = new EventEmitter();
  @Output() emitSetActiveImage: EventEmitter<number> = new EventEmitter();

  public setActiveImage(index: number): void {
    this.emitSetActiveImage.emit(index);
  }

  public onChange(value: number): void {
    this.countChange.emit(value);
  }

  public repeatRequestProduct(): void {
    this.emitRequestProduct.emit();
  }

  public handlerCounter(value: number): void {
    this.count = value >= 0 ? value : 0;
  }

  public addToCart(): void {
    if (!this.product) {
      return;
    }
    this.emitAddToCart.emit({ product: this.product, count: 1 });
  }

  protected generateBreadcrumbs(
    mainRoute: IRouteData,
    productCategory: Categories,
    productTitle: IProduct['title']
  ) {
    this.breadcrumbs = [
      mainRoute,
      {
        title: routes.catalog.title,
        url: routes.catalog.url
      },
      {
        title: CATEGORY_NAME[EnumCategories[productCategory]],
        url: routes.catalog.url,
        params: { category: CATEGORY_PARAMS[EnumCategories[productCategory]] }
      },
      { title: productTitle }
    ];
  }
}

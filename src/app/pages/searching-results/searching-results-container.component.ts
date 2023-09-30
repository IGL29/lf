import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { ProductsFilterService } from 'src/app/services/products-filter/products-filter.service';
import { ProductsService } from 'src/app/services/products/products.service';

import { IProduct } from '~types/product';
import { description } from './data/meta';
import { pages } from 'src/app/CEO';

@Component({
  selector: 'app-searching-results-container',
  templateUrl: './searching-results-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchingResultsContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  public searchValue = '';
  public isLoading: boolean;
  public products: IProduct[] = [];

  constructor(
    private title: Title,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private productsFilterService: ProductsFilterService,
    private meta: Meta
  ) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.subscribeToProductsLoading();
    this.subscribeChangeQueryParams();
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

  private subscribeToProductsLoading(): void {
    this.productsService
      .productsIsLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.cdr.markForCheck();
      });
  }

  private subscribeChangeQueryParams(): void {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroySubject),
        tap((params) => {
          this.products = [];
          this.searchValue = params['search'];
          this.title.setTitle(`${this.searchValue} - ${pages.searching.title}`);
        }),
        switchMap((params) =>
          this.productsService
            .getProducts()
            .pipe(
              map((products) =>
                products.filter((product) =>
                  this.productsFilterService.isHasTitle(product, { title: params['search'] })
                )
              )
            )
        )
      )
      .subscribe((product) => {
        this.products = product;
        this.cdr.markForCheck();
      });
  }
}

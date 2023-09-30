import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import { ParamsService } from 'src/app/services/params/params.service';
import { ICategory } from '~components/category-filter/category-filter.component';
import { categories } from '~data/product';
import { CATEGORY_PARAMS, CategoriesParams, EnumCategories } from '~types/product';

@Component({
  selector: 'app-category-filter-container',
  templateUrl: './category-filter-container.component.html',
  styleUrls: ['./category-filter-container.component.scss']
})
export class CategoryFilterContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  protected categoriesData: ICategory[] = categories;
  private initialValueFilters: { category: CategoriesParams[] } = { category: [] };
  protected activeCategories = new Set<CategoriesParams>();
  private width: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private vss: ViewportSizeService,
    private paramsService: ParamsService
  ) {}

  ngOnInit(): void {
    this.subscribeToViewportSize();
    this.subscribeToQueryParams();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  get isMobile(): boolean {
    return this.width <= 768;
  }

  private subscribeToViewportSize(): void {
    this.vss.resizeObservable$
      .pipe(
        takeUntil(this.destroySubject),
        map((sizes) => sizes.width)
      )
      .subscribe((width) => {
        this.width = width;
        this.cdr.markForCheck();
      });
  }

  private subscribeToQueryParams() {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroySubject),
        map((params) => this.paramsService.convertParamsToData(params, this.initialValueFilters))
      )
      .subscribe((dataFromParams) => {
        const categories = dataFromParams?.['category'];

        if (categories && Array.isArray(categories)) {
          this.setActiveFromParams(categories);
          this.cdr.markForCheck();
        }
      });
  }

  public setActiveFromParams(categories: CategoriesParams[]): void {
    const updatedParams = new Set<CategoriesParams>();

    categories.forEach((categoryParam: CategoriesParams) => {
      if (EnumCategories[categoryParam] in CATEGORY_PARAMS) {
        updatedParams.add(categoryParam);
      }
    });
    this.activeCategories = updatedParams;
  }

  public handlerSelectCategory(paramValue: CategoriesParams): void {
    this.switchCategory(paramValue);
    this.setQueryParams();
  }

  private switchCategory(paramValue: CategoriesParams): void {
    if (!this.activeCategories.has(paramValue)) {
      this.activeCategories.add(paramValue);
      return;
    }
    this.activeCategories.delete(paramValue);
  }

  private setQueryParams(): void {
    const currentParams =
      this.activeCategories.size > 0 ? { category: Array.from(this.activeCategories) } : {};
    this.paramsService.setParams(currentParams, this.initialValueFilters);
  }
}

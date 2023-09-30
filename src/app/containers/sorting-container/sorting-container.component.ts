import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ISortingParams, TargetSort } from './types';
import { Sort, IOption } from 'src/app/components/sorting/types';
import { OPTIONS } from './data';
import { ParamsService } from 'src/app/services/params/params.service';
import { SortingComponent } from '~components/sorting/sorting.component';

@Component({
  selector: 'app-sorting-container',
  templateUrl: './sorting-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingContainerComponent implements OnInit, OnDestroy {
  @ViewChild('sorting', { read: SortingComponent }) sortingComponent: SortingComponent;
  private destroySubject: Subject<null> = new Subject();
  private sortingParams: ISortingParams = {
    targetSort: null,
    sort: null
  };

  protected options: IOption<TargetSort>[] = OPTIONS;
  protected activeOptionIndex: number | null;

  constructor(private activatedRoute: ActivatedRoute, private paramsService: ParamsService) {}

  ngOnInit(): void {
    this.subscribeChangeQueryParams();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeChangeQueryParams(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroySubject)).subscribe(() => {
      this.saveQueryParams();
      this.setActiveOption();
    });
  }

  private saveQueryParams(): void {
    this.sortingParams.sort = this.activatedRoute.snapshot.queryParams['sort'];
    this.sortingParams.targetSort = this.activatedRoute.snapshot.queryParams['target-sort'];
  }

  private setActiveOption(): void {
    if (!this.sortingParams.sort && !this.sortingParams.targetSort) {
      this.activeOptionIndex = null;
      return;
    }
    const activeOptionIndex = this.options.findIndex(
      (option) =>
        option.sort === this.sortingParams.sort &&
        option.targetSort === this.sortingParams.targetSort
    );
    this.activeOptionIndex = activeOptionIndex === -1 ? null : activeOptionIndex;
  }

  protected handlerSetSorting(option: IOption<TargetSort> | null): void {
    this.sortingComponent.closeSorting();
    if (option) {
      this.sortingParams.sort = option.sort;
      this.sortingParams.targetSort = option.targetSort;
      this.setQueryParams(this.sortingParams.sort, this.sortingParams.targetSort);
      return;
    }
    this.setQueryParams(null);
  }

  private setQueryParams(unactive: null): void;
  private setQueryParams(sort: Sort, targetSort: TargetSort): void;
  private setQueryParams(sort: null | Sort, targetSort?: TargetSort): void {
    if (sort === null) {
      this.sortingParams.sort = null;
      this.sortingParams.targetSort = null;
      this.paramsService.resetParams({ sort: null, 'target-sort': null });
      return;
    }
    this.paramsService.setParams(
      { sort, 'target-sort': targetSort },
      { sort: null, 'target-sort': null }
    );
  }
}

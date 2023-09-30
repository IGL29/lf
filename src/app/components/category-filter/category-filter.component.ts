import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriesParams } from '~types/product';

export interface ICategory {
  title: string;
  paramValue: CategoriesParams;
}
export type DataIndex = string;

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFilterComponent {
  @Input() categories: ICategory[] = [];
  @Input() activeCategories: Set<CategoriesParams> = new Set([]);
  @Output() emitSelectCategory: EventEmitter<CategoriesParams> = new EventEmitter();

  protected isActiveCategory(paramValue: CategoriesParams): boolean {
    return this.activeCategories.has(paramValue);
  }

  protected handlerSelectCategory(ev: Partial<MouseEvent>): void {
    const target = ev.target;
    if (!target || !(target instanceof HTMLElement) || !target.getAttribute('data-param')) {
      return;
    }
    const param = target.getAttribute('data-param');
    if (param === null) {
      return;
    }
    this.emitSelectCategory.emit(<CategoriesParams>param);
  }
}

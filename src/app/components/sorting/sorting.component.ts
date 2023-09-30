import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { IOption, CategoryTitle, Sort, Title } from './types';
import { DropdownComponent } from '~components/dropdown/dropdown.component';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingComponent<T extends string = never> {
  @ViewChild('dropdown', { read: DropdownComponent }) dropdownComponent: DropdownComponent;
  private _defaultTitle: Title = 'Сортировка';
  @Input() set defaultTitle(value: IOption<T>['title']) {
    this._defaultTitle = value;
  }
  @Input() options: IOption<T>[];

  private _activeOptionIndex: number | null;
  get activeOptionIndex(): number | null {
    return this._activeOptionIndex;
  }
  @Input() set activeOptionIndex(index: number | null) {
    if (index === null) {
      this.resetActiveOption();
      return;
    }
    this.setActiveOption(index);
  }

  @Output() emitSetSorting: EventEmitter<IOption<T> | null> = new EventEmitter();

  protected categoryTitle: CategoryTitle;
  protected sort: Sort | null;

  get btnTitle(): Title {
    return this.categoryTitle || this._defaultTitle;
  }

  private setActiveOption(index: number): void {
    this._activeOptionIndex = index;
    this.sort = this.options[index].sort;
    this.categoryTitle = this.options[index].categoryTitle;
  }

  private resetActiveOption(): void {
    this._activeOptionIndex = null;
    this.sort = null;
    this.categoryTitle = this._defaultTitle;
  }

  protected setSorting(option: IOption<T>, index: number): void {
    if (index === this._activeOptionIndex) {
      this.emitSetSorting.emit(null);
      return;
    }
    this.emitSetSorting.emit(option);
  }

  public closeSorting(): void {
    if (!this.dropdownComponent) {
      return;
    }
    this.dropdownComponent.switchContentVisible(false);
  }
}

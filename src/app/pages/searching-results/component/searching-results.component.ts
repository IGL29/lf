import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '~types/product';

@Component({
  selector: 'app-searching-results',
  templateUrl: './searching-results.component.html',
  styleUrls: ['./searching-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchingResultsComponent {
  @Input() searchValue: string;
  @Input() products: IProduct[];
  @Input() productsLoading: boolean;

  get isProductsEmpty(): boolean {
    return !this.products?.length && !this.productsLoading;
  }
}

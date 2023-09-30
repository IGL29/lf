import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IPromocodeData } from 'src/app/components/promocode-field/types';
import { PromocodeService } from 'src/app/services/promocode/promocode.service';

@Component({
  selector: 'app-promocode-field-container',
  templateUrl: './promocode-field-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromocodeFieldContainerComponent {
  constructor(private promocodeService: PromocodeService) {}

  protected handlerSubmitForm(data: IPromocodeData): void {
    this.promocodeService.getDiscount(data.promocode);
  }
}

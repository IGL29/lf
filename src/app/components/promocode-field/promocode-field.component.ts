import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isNonNull } from 'src/types';
import { IPromocodeData } from './types';

@Component({
  selector: 'app-promocode-field',
  templateUrl: './promocode-field.component.html',
  styleUrls: ['./promocode-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromocodeFieldComponent {
  public promocodeControl = new FormControl<IPromocodeData['promocode']>('');
  @Input() set promocodeData(data: IPromocodeData) {
    this.promocodeControl.setValue(data.promocode);
  }

  @Output() emitSubmitForm: EventEmitter<IPromocodeData> = new EventEmitter();

  public handlerClick(): void {
    if (this.promocodeControl.invalid || !isNonNull(this.promocodeControl.value)) {
      return;
    }
    this.emitSubmitForm.emit({ promocode: this.promocodeControl.value });
  }
}

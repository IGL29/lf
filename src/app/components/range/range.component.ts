import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AtLeastOne } from 'src/types';
import { RangeTarget, RangeCallbackOnChange, IRangeValue } from './types';
import { OnTouchedCallback } from '~types/controlValueAccessor';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeComponent),
      multi: true
    }
  ]
})
export class RangeComponent implements ControlValueAccessor {
  private id = this.utilsService.generateRandomString();
  @ViewChild('inputRangeFrom')
  private inputRangeFromElRef: ElementRef<HTMLInputElement>;
  @ViewChild('inputRangeTo') inputRangeToElRef: ElementRef<HTMLInputElement>;

  @Input() gap = 1;
  @Input() min = 0;
  @Input() max = 10;

  private _value: IRangeValue = { from: this.min, to: this.max };
  @Input() set value(newValue: IRangeValue) {
    this._value = newValue;

    if (this.callbackOnChange) {
      this.callbackOnChange(newValue);
    }
    this.cdr.markForCheck();
  }
  get value(): IRangeValue {
    return this._value;
  }

  private callbackOnChange: RangeCallbackOnChange | undefined;
  private callbackOnTouched: OnTouchedCallback | undefined;

  constructor(private cdr: ChangeDetectorRef, private utilsService: UtilsService) {}

  public writeValue(rangeValue: IRangeValue): void {
    this.updateRangeState(rangeValue);
  }

  public registerOnChange(fn: RangeCallbackOnChange): void {
    this.callbackOnChange = fn;
  }

  public registerOnTouched(fn: OnTouchedCallback): void {
    this.callbackOnTouched = fn;
  }

  protected handlerInputEvent(event: Event): void {
    const targetRange: HTMLInputElement = <HTMLInputElement>event.target;

    if (targetRange.id === 'rangeFrom') {
      this.changeRangeFrom();
      return;
    }
    this.changeRangeTo();
  }

  private updateRangeState(newValue: AtLeastOne<IRangeValue>): void {
    this.value = {
      ...this.value,
      ...newValue
    };
  }

  private setValueRange(rangeTarget: RangeTarget, value: number): void {
    if (rangeTarget === 'from') {
      this.updateRangeState({ from: value });
      this.inputRangeFromElRef.nativeElement.value = String(value);
      return;
    }
    this.updateRangeState({ to: value });
    this.inputRangeToElRef.nativeElement.value = String(value);
  }

  private changeRangeFrom(): void {
    const valueRangeCurrent = Number(this.inputRangeFromElRef.nativeElement.value);
    const valueRangeTo = Number(this.inputRangeToElRef.nativeElement.value);

    if (valueRangeCurrent + this.gap > valueRangeTo) {
      this.setValueRange('from', valueRangeTo - this.gap);
      return;
    }
    this.updateRangeState({ from: valueRangeCurrent });
  }

  private changeRangeTo(): void {
    const valueRangeCurrent = Number(this.inputRangeToElRef.nativeElement.value);
    const valueRangeFrom = Number(this.inputRangeFromElRef.nativeElement.value);

    if (valueRangeCurrent - this.gap < valueRangeFrom) {
      this.setValueRange('to', valueRangeFrom + this.gap);
      return;
    }
    this.updateRangeState({ to: valueRangeCurrent });
  }
}

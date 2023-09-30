import { ChangeDetectionStrategy, Component, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { OnChangeCallback, OnTouchedCallback } from 'src/types/controlValueAccessor';
import { RadioOnChangeCallback } from './types';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() attrName: string;
  @Input() attrValue: string;
  @Input() labelValue: string;

  private _id: string = this.utilsService.generateRandomString();
  protected get id() {
    return this._id;
  }

  protected isChecked = false;

  constructor(private utilsService: UtilsService) {}

  private _value: string;
  public get value(): string {
    return this._value;
  }

  private onChangeCallBack: OnChangeCallback<string>;
  private onTouchedCallBack: OnTouchedCallback;

  @HostListener('change', ['$event.target.value'])
  private onChange(value: string) {
    if (!this.onChangeCallBack) {
      return;
    }
    this.onChangeCallBack(value);
  }

  @HostListener('focusout')
  private onFocusout() {
    if (!this.onTouchedCallBack) {
      return;
    }
    this.onTouchedCallBack();
  }

  public writeValue(value: string): void {
    this._value = value;
    this.isChecked = value === this.attrValue;
  }

  public registerOnChange(fn: RadioOnChangeCallback): void {
    this.onChangeCallBack = fn;
  }

  public registerOnTouched(fn: OnTouchedCallback): void {
    this.onTouchedCallBack = fn;
  }
}

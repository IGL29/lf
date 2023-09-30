import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  forwardRef
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { generateRandomString } from 'src/utils/randomString';
import { AttributeName, AttributeValue, LabelValue, CheckboxState } from './types';
import { OnChangeCallback, OnTouchedCallback } from '~types/controlValueAccessor';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('checkbox') checkboxElRef: ElementRef<HTMLInputElement>;
  protected readonly id: string = generateRandomString();
  protected checkboxControl = new FormControl(false);
  @Input() attrName: AttributeName;
  @Input() attrValue: AttributeValue;
  @Input() labelValue: LabelValue;

  private _isChecked: CheckboxState;
  public get isChecked(): CheckboxState {
    return this._isChecked;
  }
  protected set isChecked(isChecked: CheckboxState | null) {
    this._isChecked = !!isChecked;

    if (this.checkboxElRef) {
      this.setCheckedValueToControl();
    }
  }

  private onChangeCallBack: OnChangeCallback<CheckboxState | null>;
  private onTouchedCallBack: OnTouchedCallback;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.isChecked) {
      this.setCheckedValueToControl();
    }
  }

  @HostListener('focusout')
  private onTouched(): void {
    if (!this.onTouchedCallBack) {
      return;
    }
    this.onTouchedCallBack();
  }

  public writeValue(isChecked: CheckboxState | null): void {
    this.isChecked = isChecked;
  }

  public onChange(event: Partial<Event>): void {
    this.isChecked = !!(event && event.target && (<HTMLInputElement>event.target).checked);
    if (!this.onChangeCallBack) {
      return;
    }
    this.onChangeCallBack(this.isChecked);
  }

  public registerOnChange(fn: OnChangeCallback<CheckboxState | null>): void {
    this.onChangeCallBack = fn;
  }

  public registerOnTouched(fn: OnTouchedCallback): void {
    this.onTouchedCallBack = fn;
  }

  private setCheckedValueToControl() {
    this.checkboxElRef.nativeElement.checked = this.isChecked;
    this.cdr.markForCheck();
  }
}

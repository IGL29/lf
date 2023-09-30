import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { EmitRating, Rating, RatingNotSet } from './types';
import { OnChangeCallback, OnTouchedCallback } from '~types/controlValueAccessor';

@Component({
  selector: 'app-rating',
  templateUrl: `./rating.component.html`,
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements ControlValueAccessor {
  private readonly _id: string;

  private _rating: Rating | RatingNotSet = null;
  @Input() set rating(value: Rating | RatingNotSet) {
    this._rating = value;
    this.cdr.markForCheck();
  }
  public get rating() {
    return this._rating;
  }

  private _disabled = false;
  @Input() set isDisabled(value: boolean) {
    this._disabled = value;
  }
  @Input() maxRating = 5;
  @Output() emitOnChange: EventEmitter<EmitRating> = new EventEmitter();

  private onChangeCallBack: OnChangeCallback<string>;
  private onTouchedCallback: OnTouchedCallback;

  constructor(private cdr: ChangeDetectorRef, utilsService: UtilsService) {
    this._id = utilsService.generateRandomString();
  }

  public get disabled() {
    return this._disabled;
  }
  public get id() {
    return this._id;
  }

  protected maxRatingIterable = new Array(this.maxRating);

  public isChecked(value: number): boolean {
    return this.rating === value;
  }

  @HostListener('change', ['$event.target.value'])
  private handlerChange(value: string): void {
    if (this.onChangeCallBack) {
      this.rating = Number(value);
      this.onChangeCallBack(value);
      return;
    }
    this.rating = Number(value);
    this.emitOnChange.emit(this.rating);
  }

  @HostListener('focusout')
  private onTouched(): void {
    if (!this.onTouchedCallback) {
      return;
    }
    this.onTouchedCallback();
  }

  public generateInputId(i: number, id: string): string {
    return 'rate-' + (i + 1) + '-' + id;
  }

  public writeValue(value: Rating | null): void {
    this.rating = value;
  }

  public registerOnChange(fn: OnChangeCallback<string>): void {
    this.onChangeCallBack = fn;
  }

  public registerOnTouched(fn: OnTouchedCallback): void {
    this.onTouchedCallback = fn;
  }
}

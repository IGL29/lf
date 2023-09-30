import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { OnChangeCallback, OnTouchedCallback } from '~types/controlValueAccessor';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit, OnDestroy, ControlValueAccessor {
  protected id = this.utilsService.generateRandomString();
  private destroySubject: Subject<null>;
  protected countControl = new FormControl(0, { nonNullable: true });
  private onChangeCallBack: OnChangeCallback<number>;
  protected onTouchedCallBack: OnTouchedCallback;
  @Input() min: number;
  @Input() max: number;
  @Input() step = 1;
  @Input() set value(value: number) {
    this.countControl.setValue(value);
  }
  @Input() labelValueA11y: string;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();
  @Output() emitDecrValue: EventEmitter<number> = new EventEmitter();
  @Output() emitIncrValue: EventEmitter<number> = new EventEmitter();

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.destroySubject = new Subject();
    this.subscribeToValueChanges();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToValueChanges(): void {
    this.countControl.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe((value) => {
      if (value < this.min) {
        return this.countControl.setValue(this.min);
      }
      if (value > this.max) {
        return this.countControl.setValue(this.max);
      }
      this.onChange(value);
    });
  }

  private onChange(value: number): void {
    this.valueChange.emit(value);

    if (this.onChangeCallBack) {
      this.onChangeCallBack(value);
    }
  }

  protected onTouched(): void {
    if (!this.onTouchedCallBack) {
      return;
    }
    this.onTouchedCallBack();
  }

  get isDisabledDecrButton(): boolean {
    return this.min >= this.countControl.value;
  }

  get isDisabledIncButton(): boolean {
    return this.max <= this.countControl.value;
  }

  protected doDecrement(): void {
    this.countControl.setValue(this.countControl.value - 1);
  }
  protected doIncrement(): void {
    this.countControl.setValue(this.countControl.value + 1);
  }

  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: OnChangeCallback<number>): void {
    this.onChangeCallBack = fn;
  }
  public registerOnTouched(fn: OnTouchedCallback): void {
    this.onTouchedCallBack = fn;
  }
}

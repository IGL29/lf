import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isFormGroup, isNonNull } from '~types/guards';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { IFiltersFormData, ICheckboxesGroupData } from './types';
@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.scss']
})
export class FiltersFormComponent implements AfterViewInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  public filtersForm: FormGroup;
  private _filtersData: IFiltersFormData;
  public rangeMin = 1;
  public rangeMax = 1000;

  @Input() set filtersData(filtersData: IFiltersFormData) {
    this._filtersData = filtersData;

    if (!this.filtersForm) {
      this.createForm(filtersData);
      return;
    }
  }
  get filtersData() {
    return this._filtersData;
  }
  @Input() set updatedFiltersData(filtersData: IFiltersFormData) {
    this.filtersForm.patchValue(filtersData);
  }

  @Output() emitControlsValueChanged: EventEmitter<typeof this.filtersForm.value> =
    new EventEmitter();
  @Output() emitResetFilters: EventEmitter<void> = new EventEmitter();

  ngAfterViewInit(): void {
    this.subscribeToValuesChanges();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToValuesChanges(): void {
    this.filtersForm.valueChanges
      .pipe(takeUntil(this.destroySubject), debounceTime(1200))
      .subscribe((formValues) => this.emitControlsValueChanged.emit(formValues));
  }

  private createForm(filtersData: IFiltersFormData): void {
    this.filtersForm = new FormGroup({});

    for (const [keyGroup, controls] of Object.entries(filtersData)) {
      const isRangeValue =
        typeof controls === 'object' && controls !== null && 'from' in controls && 'to' in controls;
      const isCheckboxes = typeof controls === 'object' && controls !== null;

      if (isRangeValue) {
        this.filtersForm.addControl(keyGroup, new FormControl(controls));
        continue;
      }

      if (isCheckboxes) {
        this.createFromGroupCheckboxes(keyGroup, controls);
      }
    }
  }

  private createFromGroupCheckboxes(groupName: string, controls: ICheckboxesGroupData): void {
    for (const [controlName, controlValue] of Object.entries(controls)) {
      let group = this.filtersForm.get(groupName);

      if (!group) {
        this.filtersForm.addControl(groupName, new FormGroup({}));
      }

      group = this.filtersForm.get(groupName);
      if (isNonNull(group) && isFormGroup(group)) {
        group.addControl(controlName, new FormControl(controlValue));
      }
    }
  }

  public handlerResetFilters(): void {
    this.emitResetFilters.emit();
  }
}

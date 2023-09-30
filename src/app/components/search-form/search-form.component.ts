import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchValue } from './types';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {
  @Input() set seachValue(value: SearchValue) {
    this.inputSearchValue = value;
  }
  @Output() emitSubmitForm: EventEmitter<{ search: SearchValue }> = new EventEmitter();

  public inputSearchValue: SearchValue = '';

  public handlerSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.emitSubmitForm.emit({ search: form.value.search });
    form.reset();
  }
}

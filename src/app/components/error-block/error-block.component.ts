import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-block',
  templateUrl: './error-block.component.html',
  styleUrls: ['./error-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorBlockComponent {
  @Input() text = 'Произошла ошибка';
  @Output() emitRepeatRequest: EventEmitter<void> = new EventEmitter();

  protected repeatRequest(): void {
    this.emitRepeatRequest.emit();
  }
}

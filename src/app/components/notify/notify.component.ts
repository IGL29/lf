import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { INotify } from './types';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotifyComponent {
  @Input() notify: INotify;
  @Output() emitClose: EventEmitter<null> = new EventEmitter();

  protected handlerClose(): void {
    this.emitClose.emit();
  }
}

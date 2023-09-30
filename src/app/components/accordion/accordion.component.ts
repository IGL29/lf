import { expandAnimation } from '~animations/expand-animation';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef
} from '@angular/core';
import { IsOpen } from './types';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [expandAnimation]
})
export class AccordionComponent {
  @ContentChild('bodyContent') bodyContent: TemplateRef<HTMLElement>;
  private _isOpen = false;

  @Input() set isOpen(value: IsOpen) {
    this._isOpen = value;
  }
  public get isOpen(): IsOpen {
    return this._isOpen;
  }

  public switchContentVisible(value?: IsOpen): void {
    if (value === undefined) {
      this.isOpen = !this.isOpen;
      return;
    }
    this.isOpen = value;
  }
}

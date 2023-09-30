import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEventHandlerArgs, ContentPosition, Trigger, IsCloseBy } from './types';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  private _contentPosition: ContentPosition = 'center';
  private _isVisibleContent = false;

  @Input() trigger: Trigger = 'hover';
  @Input() set position(value: ContentPosition) {
    this._contentPosition = value;
  }
  @Input() isCloseBy: IsCloseBy = null;

  public get contentPosition(): ContentPosition {
    return this._contentPosition;
  }

  public get isVisibleContent(): boolean {
    return this._isVisibleContent;
  }

  protected eventHandler({ event, value }: IEventHandlerArgs): void {
    if (!event) {
      this.switchContentVisible(value);
      return;
    }
    if (this.isCLickEvent(event)) {
      this.switchContentVisible(value);
    }
    if (this.isHoverEvent(event)) {
      this.switchContentVisible(value);
    }
  }

  public switchContentVisible(isOpen?: boolean): void {
    this._isVisibleContent = isOpen ?? !this._isVisibleContent;
  }

  private isCLickEvent(event: UIEvent): boolean {
    return this.trigger === 'click' && event?.type === 'click';
  }

  private isHoverEvent(event: UIEvent): boolean {
    return (
      (this.trigger === 'hover' &&
        (event?.type === 'mouseenter' || event?.type === 'mouseleave')) ||
      (this.isCloseBy === 'mouseleave' && event?.type === 'mouseleave')
    );
  }

  public handlerOutsideTrigger = () => this.switchContentVisible(false);
}

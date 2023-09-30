import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { TabActive, TabLink, TabTitle } from './types';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @ContentChild(TemplateRef) contentTemplateRef: TemplateRef<unknown>;
  private _isActive: TabActive = false;
  private _isFirstActivation = true;
  @Input() tabTitle: TabTitle;
  @Input() link: TabLink = '';
  @Input() isCache: boolean;
  @Input() set isActive(isActive: boolean) {
    if (isActive && this.contentTemplateRef && this._isFirstActivation) {
      this.insertEmbeddedView();
    }
    this._isActive = isActive;
    this.cdr.markForCheck();
  }
  get isActive(): TabActive {
    return this._isActive;
  }

  constructor(private cdr: ChangeDetectorRef, private vcr: ViewContainerRef) {}

  private insertEmbeddedView(): void {
    const empbeddedViewRef: EmbeddedViewRef<unknown> = this.vcr.createEmbeddedView(
      this.contentTemplateRef
    );
    this.vcr.insert(empbeddedViewRef);
    this._isFirstActivation = false;
  }
}

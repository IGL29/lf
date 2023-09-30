import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter((tab) => tab.isActive);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  public selectTab(tab: { isActive: boolean }): void {
    this.tabs.toArray().forEach((tab) => (tab.isActive = false));
    tab.isActive = true;
  }
}

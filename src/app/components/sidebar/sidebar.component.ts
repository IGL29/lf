import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PositionMenu } from './types';
import {
  KeydownEventService,
  KeydownKey
} from 'src/app/services/events/keydown/keydown-event.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
  private _isOpen = false;
  private set isMenuOpen(value: boolean) {
    this.switchScrolling(value);
    this._isOpen = value;
    this.cdr.markForCheck();
  }

  private destroySubject: Subject<null> = new Subject();
  @Input() positionMenu: PositionMenu = 'left';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private keydownEventService: KeydownEventService
  ) {}

  ngOnInit(): void {
    this.keydownEventService.keydownObservable$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((key) => this.keydownObserver(key));
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private keydownObserver(key: KeydownKey): void {
    if (key === 'Escape' && this._isOpen) {
      this.switchVisibleMenu(false);
    }
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public get isLeftPosition(): boolean {
    return this.positionMenu === 'left';
  }

  public get isRightPosition(): boolean {
    return this.positionMenu === 'right';
  }

  public switchVisibleMenu(value?: boolean): void {
    if (value === undefined) {
      this.isMenuOpen = !this.isMenuOpen;
      return;
    }
    this.isMenuOpen = value;
  }

  private switchScrolling(value: boolean): void {
    if (value) {
      this.renderer.addClass(this.document.body, 'overflow-hidden');
      return;
    }
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
  }
}

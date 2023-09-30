import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DropdownComponent } from 'src/app/components/dropdown/dropdown.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { contacts } from '~data/contacts';
import { categories } from '~data/product';
import { routes } from '~data/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('burgerMenuBtn') burgerMenuBtn: ElementRef<HTMLElement>;
  @ViewChild('dropdown') dropdown: DropdownComponent;
  private destroySubject: Subject<null> = new Subject();
  private _isBurgerMenuOpen = false;
  private _isOnMove = false;
  private _isMainRoute = false;
  public isHeaderTransparent = false;
  public navData = routes;
  public categoriesData = categories;
  public phoneNumber = contacts.phone;
  public countInCart: number;

  @Input() set isOnMove(isOnMove: boolean) {
    this._isOnMove = isOnMove;
    this.isHeaderTransparent = this._isMainRoute && !isOnMove;
  }
  @Input() set isMainRoute(isMainRoute: boolean) {
    this._isMainRoute = isMainRoute;
    this.isHeaderTransparent = isMainRoute && !this._isOnMove;
  }
  get isMainRoute(): boolean {
    return this._isMainRoute;
  }

  @Input() set isBurgerMenuOpen(isOpen: boolean) {
    if (!isOpen && this._isBurgerMenuOpen) {
      this.setFocusToBurgerButton();
    }
    this._isBurgerMenuOpen = isOpen;
  }
  get isBurgerMenuOpen(): boolean {
    return this._isBurgerMenuOpen;
  }

  @Output() emitBurgerClick: EventEmitter<undefined> = new EventEmitter();
  @Output() emitCartClick: EventEmitter<undefined> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef, private cartService: CartService) {}

  ngOnInit(): void {
    this.subscribeToCountInCart();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToCountInCart(): void {
    this.cartService
      .getCountInCart()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((count) => {
        this.countInCart = count;
        this.cdr.markForCheck();
      });
  }

  public emitSwitchBurgerMenu(): void {
    this.emitBurgerClick.emit();
  }

  public emitSwitchCartMenu(): void {
    this.emitCartClick.emit();
  }

  public closeDropdown(event: MouseEvent): void {
    const target = <HTMLElement>event.target;

    if (target && target.tagName === 'A') {
      this.dropdown.switchContentVisible(false);
    }
  }

  public setFocusToBurgerButton(): void {
    this.burgerMenuBtn.nativeElement.focus();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { address } from 'src/data/address';
import { contacts } from 'src/data/contacts';
import { routes } from '~data/routes';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerMenuComponent {
  public dataNav = routes;
  public dataAddress = address;
  public dataContacts = contacts;
  public firstElementElRef: ElementRef<HTMLElement>;
  @Output() emitCloseMenu: EventEmitter<void> = new EventEmitter();

  public closeMenu(): void {
    this.emitCloseMenu.emit();
  }
}

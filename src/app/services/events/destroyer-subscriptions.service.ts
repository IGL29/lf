import { Injectable } from '@angular/core';
import { KeydownEventService } from './keydown/keydown-event.service';
import { PointerEventService } from './pointer/pointer-event.service';
import { ViewportSizeService } from './resize/viewport-size.service';
import { ScrollEventService } from './scroll/scroll-event.service';

@Injectable({
  providedIn: 'root'
})
export class DestroyerSubscriptionsService {
  constructor(
    private vss: ViewportSizeService,
    private pointerEventService: PointerEventService,
    private keydownEventService: KeydownEventService,
    private scrollEventService: ScrollEventService
  ) {}

  public destroyAll(): void {
    this.keydownEventService.destroy();
    this.pointerEventService.destroy();
    this.scrollEventService.destroy();
    this.vss.destroy();
  }
}

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IS_PLATFORM_BROWSER_TOKEN } from 'src/app/tokens/isPlatformBrowser';
import { WINDOW_TOKEN } from 'src/app/tokens/window';

export interface IViewportSizes {
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class ViewportSizeService {
  private _destroySubject = new Subject();
  private _resizeSubject: BehaviorSubject<IViewportSizes>;
  private _resizeObservable$ = this.isPlatformBrowser(this.platformId)
    ? fromEvent<UIEvent>(this.window, 'resize').pipe(
        takeUntil(this._destroySubject),
        map(this.getSizesFromResizeEvent),
        debounceTime(200)
      )
    : new Subject<IViewportSizes>();

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(IS_PLATFORM_BROWSER_TOKEN) private isPlatformBrowser: (id: string) => boolean
  ) {
    const { innerWidth: width, innerHeight: height } = this.window;
    this._resizeSubject = new BehaviorSubject<IViewportSizes>({
      width,
      height
    });
    this._resizeObservable$.subscribe(this._resizeSubject);
  }

  private getSizesFromResizeEvent(event: UIEvent): IViewportSizes {
    const target = <Window>event.target;

    return {
      width: target.innerWidth,
      height: target.innerHeight
    };
  }

  public get resizeObservable$(): Observable<IViewportSizes> {
    return this._resizeSubject;
  }

  public destroy() {
    this._destroySubject.next(null);
    this._destroySubject.complete();
  }
}

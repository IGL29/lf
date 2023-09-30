import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, fromEvent, map, takeUntil } from 'rxjs';

export interface IPointerPosition {
  clientX: PointerEvent['clientX'];
  clientY: PointerEvent['clientX'];
}

export interface IPointerEvent extends IPointerPosition {
  pointerType: PointerEvent['pointerType'];
}

@Injectable({
  providedIn: 'root'
})
export class PointerEventService {
  private _destroySubject: Subject<null>;
  private _pointerSubject$: Subject<IPointerEvent>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this._destroySubject = new Subject();
    this._pointerSubject$ = new Subject<IPointerEvent>();
    this.subscribeToPointermove();
  }

  private subscribeToPointermove(): void {
    fromEvent<PointerEvent>(this.document, 'pointermove')
      .pipe(takeUntil(this._destroySubject), map(this.getPointerPosition))
      .subscribe(this._pointerSubject$);
  }

  private getPointerPosition(ev: PointerEvent): IPointerEvent {
    return { pointerType: ev.pointerType, clientX: ev.clientX, clientY: ev.clientY };
  }

  public get pointermoveObservable$(): Observable<IPointerEvent> {
    return this._pointerSubject$;
  }

  public destroy(): void {
    this._destroySubject.next(null);
    this._destroySubject.complete();
  }
}

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Scroll } from '@angular/router';
import { Observable, Subject, fromEvent, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollEventService {
  private _destroySubject = new Subject<null>();
  private _scrollObservable$ = fromEvent<Scroll>(this.document, 'scroll').pipe(
    takeUntil(this._destroySubject)
  );

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public get scrollObservable$(): Observable<Scroll> {
    return this._scrollObservable$;
  }

  public destroy(): void {
    this._destroySubject.next(null);
    this._destroySubject.complete();
  }
}

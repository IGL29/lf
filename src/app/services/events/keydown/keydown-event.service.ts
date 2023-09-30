import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, fromEvent, map, takeUntil } from 'rxjs';

export type KeydownKey = KeyboardEvent['key'];

@Injectable({
  providedIn: 'root'
})
export class KeydownEventService {
  private _destroySubject = new Subject();
  private _keydownSubject: Subject<KeydownKey>;
  private _keydownObservable$ = fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(
    takeUntil(this._destroySubject),
    map(this.getKey)
  );

  constructor(@Inject(DOCUMENT) private document: Document) {
    this._keydownSubject = new Subject<KeydownKey>();
    this._keydownObservable$.subscribe(this._keydownSubject);
  }

  private getKey(ev: KeyboardEvent): KeyboardEvent['key'] {
    return ev.key;
  }

  public get keydownObservable$(): Observable<KeydownKey> {
    return this._keydownSubject;
  }

  public destroy() {
    this._destroySubject.next(null);
    this._destroySubject.complete();
  }
}

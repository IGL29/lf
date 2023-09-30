import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ButtonScrollDirective } from '../button-scroll.directive';
import { TestHostComponent } from './test-host.component';
import { findElement } from '__tests__/utils/findElement';
import { By } from '@angular/platform-browser';
import { ScrollEventService } from 'src/app/services/events/scroll/scroll-event.service';
import { mockScrollEventService } from '__tests__/mocks/services/ScrollEventService';
import { ButtonScrollModule } from '../button-scroll.module';
import { Subject } from 'rxjs';
import { mockWindow } from '__tests__/mocks/browserApi/window';
import { WINDOW_TOKEN } from 'src/app/tokens/window';

describe('TestHostButtonScrollDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: ButtonScrollDirective;
  let host: HTMLElement;

  beforeEach(() => {
    TestBed.overrideModule(ButtonScrollModule, {
      add: {
        providers: [
          {
            provide: WINDOW_TOKEN,
            useValue: mockWindow
          }
        ]
      }
    });
    TestBed.configureTestingModule({
      imports: [TestHostComponent, ButtonScrollModule],
      providers: [
        {
          provide: ScrollEventService,
          useValue: mockScrollEventService
        }
      ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    directive = fixture.debugElement
      .query(By.directive(ButtonScrollDirective))
      .injector.get(ButtonScrollDirective);
    host = findElement(fixture, '[appButtonScroll]').nativeElement;
    mockScrollEventService['scrollObservable$'] = new Subject();
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should subscribe to scroll events after view init', () => {
    directive['subscribeToScrollEvent'] = jasmine.createSpy();
    directive.ngAfterViewInit();
    expect(directive['subscribeToScrollEvent']).toHaveBeenCalled();
  });

  it('should unsubscribe from scroll events', () => {
    directive['destroySubject'] = jasmine.createSpyObj(['next', 'complete']);
    directive.ngOnDestroy();
    expect(directive['destroySubject'].next).toHaveBeenCalled();
    expect(directive['destroySubject'].complete).toHaveBeenCalled();
  });

  it('should return host element', () => {
    expect(directive['host']).toBe(host);
  });

  it('should return host element', () => {
    expect(directive['host']).toBe(host);
  });

  it('should set scrollY if getted scroll event from stream after 700ms', fakeAsync(() => {
    mockWindow['scrollY'] = 100;
    mockScrollEventService['scrollObservable$'].next(true);
    tick(700);
    expect(directive['scrollY']).toBe(100);
  }));

  it('should call switchVisibility if getted scroll event from stream after 700ms', fakeAsync(() => {
    directive['switchVisibility'] = jasmine.createSpy();
    mockScrollEventService['scrollObservable$'].next(true);
    tick(700);
    expect(directive['switchVisibility']).toHaveBeenCalled();
  }));

  it('should set class if scroll more 500', () => {
    directive['scrollY'] = 501;
    directive['switchVisibility']();
    fixture.detectChanges();
    expect(host.classList.contains('btn-scroll--active')).toBeTrue();
  });

  it('should set class if scroll is 500 and less 500', () => {
    directive['scrollY'] = 500;
    directive['switchVisibility']();
    fixture.detectChanges();
    expect(host.classList.contains('btn-scroll--active')).toBeFalse();
  });

  it('should call handlerScroll if click by host', () => {
    directive['handlerScroll'] = jasmine.createSpy();
    host.click();
    expect(directive['handlerScroll']).toHaveBeenCalled();
  });
});

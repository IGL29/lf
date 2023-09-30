import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { mockRouter } from '__tests__/mocks/router/router';
import { TestHostComponent } from './test-host.component';
import { ChangeRouteDirective } from '../change-route.directive';
import { By } from '@angular/platform-browser';
import { ChangeRouteModule } from '../change-route.module';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChangeRouteDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: ChangeRouteDirective;

  beforeEach(() => {
    TestBed.overrideModule(ChangeRouteModule, {
      set: {
        providers: [
          {
            provide: RouterModule,
            useClass: RouterTestingModule
          },
          {
            provide: Router,
            useValue: mockRouter
          }
        ]
      }
    });

    TestBed.configureTestingModule({
      imports: [TestHostComponent, ChangeRouteModule]
    }).compileComponents();

    mockRouter['events'] = new Subject();
    fixture = TestBed.createComponent(TestHostComponent);
    directive = fixture.debugElement
      .query(By.directive(ChangeRouteDirective))
      .injector.get(ChangeRouteDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call cahngeRoute.emit when get Navigation end event', () => {
    directive['appChangeRoute'].emit = jasmine.createSpy();
    mockRouter.events.next(new NavigationEnd(1, '/catalog', '/catalog'));
    expect(directive['appChangeRoute'].emit).toHaveBeenCalled();
  });

  it('should not call cahngeRoute.emit if get event different from Navigation end', () => {
    directive['appChangeRoute'].emit = jasmine.createSpy();
    mockRouter.events.next(new NavigationStart(1, '/catalog'));
    expect(directive['appChangeRoute'].emit).not.toHaveBeenCalled();
  });
});

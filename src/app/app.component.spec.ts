import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './services/app/app.service';
import { mockAppService } from '__tests__/mocks/services/AppService';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { DestroyerSubscriptionsService } from './services/events/destroyer-subscriptions.service';
import { mockDestroyerSubscriptionsService } from '__tests__/mocks/services/DestroyerSubscriptionsService';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    mockAppService.currentUrl$ = new Subject();
    mockAppService.isMainRouteCheck = jasmine.createSpy();

    await TestBed.configureTestingModule({
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: DestroyerSubscriptionsService, useValue: mockDestroyerSubscriptionsService }
      ],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call dispatchStartAction', () => {
    mockAppService.disaptchStartAction = jasmine.createSpy();
    component.ngOnInit();
    expect(mockAppService.disaptchStartAction).toBeTruthy();
  });

  it('should set isMainRoute if getted value from appService.currentUrl$ stream', () => {
    component.ngOnInit();
    mockAppService.isMainRouteCheck.and.returnValue(true);
    mockAppService.currentUrl$.next('/');
    expect(component['isMainRoute']).toBeTrue();
  });
});

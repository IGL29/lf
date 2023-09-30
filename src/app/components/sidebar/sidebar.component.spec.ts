import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { KeydownEventService } from 'src/app/services/events/keydown/keydown-event.service';
import { mockKeydownEventService } from '__tests__/mocks/services/KeydownEventService';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        {
          provide: KeydownEventService,
          useValue: mockKeydownEventService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    mockKeydownEventService['keydownObservable$'] = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

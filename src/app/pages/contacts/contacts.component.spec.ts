import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { YmapsService } from 'src/app/services/ymaps/ymaps.service';
import { mockYmapsService } from '__tests__/mocks/services/YmapsService';
import { provideNgxMask, NgxMaskPipe } from 'ngx-mask';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      providers: [
        {
          provide: YmapsService,
          useValue: mockYmapsService
        },
        provideNgxMask()
      ],
      imports: [NgxMaskPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

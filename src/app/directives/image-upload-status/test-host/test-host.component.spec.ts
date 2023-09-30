import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageUploadStatusModule } from '../image-upload-status.module';
import { TestHostComponent } from './test-host.component';
import { findDirective } from '__tests__/utils/findDirective';
import { ImageUploadStatusDirective } from '../image-upload-status.directive';
import { findElement } from '__tests__/utils/findElement';
import { DebugElement } from '@angular/core';

describe('ForEntriesDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: ImageUploadStatusDirective;
  let host: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, ImageUploadStatusModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = findElement(fixture, '[data-test="host"]');
    directive = findDirective(fixture, ImageUploadStatusDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add css class to img if img is loading', () => {
    host.nativeElement.src = 'someImageUrl';
    fixture.detectChanges();
    expect(host.nativeElement.classList.contains('image-loading')).toBeTrue();
  });

  it('should add custom css class to img if img is loading', () => {
    directive.classNameLoading = 'custom-class';
    host.nativeElement.src = 'someImageUrl';
    fixture.detectChanges();
    expect(host.nativeElement.classList.contains('custom-class')).toBeTrue();
  });

  it('should remove css class from img if img is upload', () => {
    host.nativeElement.src = 'someImageUrl';
    fixture.detectChanges();
    host.triggerEventHandler('load', { currentTarget: host.nativeElement });
    expect(host.nativeElement.classList.contains('image-loading')).toBeFalsy();
  });
});

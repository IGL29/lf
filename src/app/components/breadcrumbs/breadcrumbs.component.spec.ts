import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(BreadcrumbsComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render static text if not passed url', () => {
    component.links = [{ title: 'Текущая страница' }];
    fixture.detectChanges();
    const linkDebugEl = findElement(fixture, '[data-test="link"]');
    const textDebugEl = findElement(fixture, '[data-test="text"]');
    expect(linkDebugEl).toBeFalsy();
    expect(textDebugEl).toBeTruthy();
  });

  it('should render link if passed url', () => {
    component.links = [{ title: 'Каталог', url: '/catalog' }];
    fixture.detectChanges();
    const linkDebugEl = findElement(fixture, '[data-test="link"]');
    const textDebugEl = findElement(fixture, '[data-test="text"]');
    expect(linkDebugEl).toBeTruthy();
    expect(textDebugEl).toBeFalsy();
  });
});

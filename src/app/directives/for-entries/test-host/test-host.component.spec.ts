import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestHostComponent } from './test-host.component';
import { ForEntriesModule } from '../for-entries.module';
import { findAllElements } from '__tests__/utils/findAllElements';

describe('ForEntriesDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, ForEntriesModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render correctly count of elements', () => {
    component.object = { propOne: 'valueOne', propTwo: 'valueTwo' };
    fixture.detectChanges();
    const itemsDebugElements = findAllElements(fixture, '[data-test="item"]');
    expect(itemsDebugElements.length).toBe(2);
  });

  it('should render entry value', () => {
    component.object = { propOne: 'valueOne', propTwo: 'valueTwo' };
    fixture.detectChanges();
    const itemsDebugElements = findAllElements(fixture, '[data-entry="propOne"]');
    expect(itemsDebugElements[0].nativeElement.textContent).toContain('valueOne');
  });
});

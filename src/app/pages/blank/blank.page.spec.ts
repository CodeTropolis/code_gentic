import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlankPage } from './blank.page';

describe('BlankPage', () => {
  let fixture: ComponentFixture<BlankPage>;
  let component: BlankPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BlankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define mock rows', () => {
    expect(Array.isArray(component.rows)).toBeTrue();
    expect(component.rows.length).toBeGreaterThan(0);
  });

  it('should render the correct number of rows', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-item.blank-row'));
    expect(items.length).toBe(component.rows.length);
  });

  it('each row should have a chevron icon on the right (slot=end)', () => {
    const icons = fixture.debugElement.queryAll(By.css('ion-item.blank-row ion-icon[slot="end"][name="chevron-forward-outline"]'));
    expect(icons.length).toBe(component.rows.length);
  });
});

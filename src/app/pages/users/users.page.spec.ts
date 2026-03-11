import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsersPage } from './users.page';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPage]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of rows', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-item.list-row'));
    expect(items.length).toBeGreaterThan(0);
  });

  it('should render correct row count for users list', () => {
    expect(component.listType).toBe('users');
    const items = fixture.debugElement.queryAll(By.css('ion-item.list-row'));
    expect(items.length).toBe(component.users.length);
  });

  it('each row should include a chevron icon in the end slot', () => {
    const icons = fixture.debugElement.queryAll(By.css('ion-item.list-row ion-icon[slot="end"][name="chevron-forward-outline"]'));
    expect(icons.length).toBe(component.users.length);
  });

  it('users rows should include avatar image, name, and email', () => {
    const firstItem = fixture.debugElement.query(By.css('ion-item.list-row'));
    expect(firstItem).toBeTruthy();

    const img = firstItem.query(By.css('.avatar img'));
    expect(img).toBeTruthy();

    const primary = firstItem.query(By.css('ion-label .primary'));
    const secondary = firstItem.query(By.css('ion-label .secondary'));

    expect(primary.nativeElement.textContent.trim().length).toBeGreaterThan(0);
    expect(secondary.nativeElement.textContent.trim()).toContain('@');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsersPage } from './users.page';

describe('UsersPage', () => {
  let fixture: ComponentFixture<UsersPage>;
  let component: UsersPage;

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

  it('should render a list item for each user', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-item.users-list__item'));
    expect(items.length).toBe(component.users.length);
  });

  it('should render name and email for the first user', () => {
    const first = component.users[0];
    const firstItem = fixture.debugElement.queryAll(By.css('ion-item.users-list__item'))[0];

    const nameEl = firstItem.query(By.css('.users-list__name'));
    const emailEl = firstItem.query(By.css('.users-list__email'));

    expect(nameEl.nativeElement.textContent).toContain(first.name);
    expect(emailEl.nativeElement.textContent).toContain(first.email);
  });

  it('should render a chevron icon on the right for each row', () => {
    const icons = fixture.debugElement.queryAll(By.css('ion-item.users-list__item ion-icon[name="chevron-forward-outline"][slot="end"]'));
    expect(icons.length).toBe(component.users.length);
  });

  it('trackByUserId should return the user id', () => {
    const u = component.users[2];
    expect(component.trackByUserId(0, u)).toBe(u.id);
  });
});

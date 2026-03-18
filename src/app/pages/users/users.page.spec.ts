import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsersPage } from './users.page';

describe('UsersPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPage]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UsersPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render a list of users', () => {
    const fixture = TestBed.createComponent(UsersPage);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const items = fixture.debugElement.queryAll(By.css('ion-item.users-list__item'));

    expect(items.length).toBeGreaterThan(0);
    expect(items.length).toBe(component.users.length);
  });

  it('each row should show name, email, avatar image, and chevron icon', () => {
    const fixture = TestBed.createComponent(UsersPage);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const first = component.users[0];

    const firstItem = fixture.debugElement.queryAll(By.css('ion-item.users-list__item'))[0];
    expect(firstItem).toBeTruthy();

    const nameEl = firstItem.query(By.css('.users-list__name'));
    const emailEl = firstItem.query(By.css('.users-list__email'));
    const imgEl = firstItem.query(By.css('.users-list__avatar img'));
    const chevronEl = firstItem.query(By.css('ion-icon[name="chevron-forward-outline"][slot="end"]'));

    expect(nameEl.nativeElement.textContent).toContain(first.name);
    expect(emailEl.nativeElement.textContent).toContain(first.email);
    expect(imgEl.nativeElement.getAttribute('src')).toBe(first.photoUrl);
    expect(chevronEl).toBeTruthy();
  });

  it('should render the correct row count even after change detection runs again', () => {
    const fixture = TestBed.createComponent(UsersPage);
    fixture.detectChanges();
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const items = fixture.debugElement.queryAll(By.css('ion-item.users-list__item'));
    expect(items.length).toBe(component.users.length);
  });
});

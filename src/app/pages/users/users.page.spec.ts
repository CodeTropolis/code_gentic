import { TestBed, ComponentFixture } from '@angular/core/testing';
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

  it('should render the title', () => {
    const titleEl: HTMLElement | null = fixture.nativeElement.querySelector('ion-title');
    expect(titleEl?.textContent?.trim()).toBe('Users');
  });

  it('should render a row for each user', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-item.row'));
    expect(items.length).toBe(component.users.length);
  });

  it('each row should include name, email, avatar image, and chevron icon', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-item.row'));
    expect(items.length).toBeGreaterThan(0);

    for (const item of items) {
      const name = item.query(By.css('.name'));
      const email = item.query(By.css('.email'));
      const img = item.query(By.css('.avatar img'));
      const chevron = item.query(By.css('ion-icon[slot="end"][name="chevron-forward-outline"]'));

      expect(name).withContext('name missing').toBeTruthy();
      expect((name.nativeElement as HTMLElement).textContent?.trim().length).toBeGreaterThan(0);

      expect(email).withContext('email missing').toBeTruthy();
      expect((email.nativeElement as HTMLElement).textContent?.trim().length).toBeGreaterThan(0);

      expect(img).withContext('avatar image missing').toBeTruthy();
      const src = (img.nativeElement as HTMLImageElement).getAttribute('src') || '';
      expect(src.length).toBeGreaterThan(0);

      expect(chevron).withContext('chevron icon missing').toBeTruthy();
    }
  });

  it('should use trackById for stable tracking', () => {
    const u = component.users[0];
    expect(component.trackById(0, u)).toBe(u.id);
  });
});

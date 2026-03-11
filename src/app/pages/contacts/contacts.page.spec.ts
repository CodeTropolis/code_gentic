import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactsPage } from './contacts.page';

describe('ContactsPage', () => {
  let fixture: ComponentFixture<ContactsPage>;
  let component: ContactsPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the page title', () => {
    const titleEl = fixture.debugElement.query(By.css('ion-title'));
    expect(titleEl).toBeTruthy();
    expect((titleEl.nativeElement.textContent || '').trim()).toBe('Contacts');
  });

  it('should render a row for each contact', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-item.contact-row'));
    expect(items.length).toBe(component.contacts.length);
  });

  it('should render contact name and phone for each row', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-item.contact-row'));
    expect(items.length).toBeGreaterThan(0);

    items.forEach((itemDe, idx) => {
      const text = (itemDe.nativeElement.textContent || '').replace(/\s+/g, ' ').trim();
      expect(text).toContain(component.contacts[idx].name);
      expect(text).toContain(component.contacts[idx].phone);
    });
  });

  it('should render a chevron icon on the right for each row', () => {
    const icons = fixture.debugElement.queryAll(By.css('ion-item.contact-row ion-icon[name="chevron-forward-outline"]'));
    expect(icons.length).toBe(component.contacts.length);

    const firstIcon = icons[0].nativeElement as HTMLElement;
    expect(firstIcon.getAttribute('slot')).toBe('end');
  });
});

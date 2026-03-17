import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with invalid form and disabled submit button', () => {
    expect(component.form.invalid).toBeTrue();

    const btnDe = fixture.debugElement.query(By.css('ion-button'));
    expect(btnDe).toBeTruthy();
    expect(btnDe.nativeElement.disabled).toBeTrue();
  });

  it('should validate email required + email format', () => {
    const email = component.emailCtrl;

    email.setValue('');
    email.markAsTouched();
    fixture.detectChanges();
    expect(email.hasError('required')).toBeTrue();

    email.setValue('not-an-email');
    fixture.detectChanges();
    expect(email.hasError('email')).toBeTrue();

    email.setValue('test@example.com');
    fixture.detectChanges();
    expect(email.valid).toBeTrue();
  });

  it('should require password', () => {
    const password = component.passwordCtrl;

    password.setValue('');
    password.markAsTouched();
    fixture.detectChanges();
    expect(password.hasError('required')).toBeTrue();

    password.setValue('secret');
    fixture.detectChanges();
    expect(password.valid).toBeTrue();
  });

  it('should enable submit when form is valid and log on submit', () => {
    const spy = spyOn(console, 'log');

    component.form.setValue({
      email: 'user@example.com',
      password: 'pw123456',
    });
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    const btnDe = fixture.debugElement.query(By.css('ion-button'));
    expect(btnDe.nativeElement.disabled).toBeFalse();

    component.onSubmit();
    expect(spy).toHaveBeenCalled();

    const [msg, payload] = spy.calls.mostRecent().args;
    expect(msg).toContain('Login submit');
    expect(payload).toEqual({ email: 'user@example.com', password: 'pw123456' });
  });

  it('should not log when submitting invalid form', () => {
    const spy = spyOn(console, 'log');

    component.form.setValue({
      email: '',
      password: '',
    });
    fixture.detectChanges();

    expect(component.form.invalid).toBeTrue();

    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });
});

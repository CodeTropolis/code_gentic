import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially and disable submit button', () => {
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

    email.setValue('user@example.com');
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

  it('should enable submit button when form is valid', () => {
    component.form.setValue({ email: 'user@example.com', password: 'secret' });
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    const btnDe = fixture.debugElement.query(By.css('ion-button'));
    expect(btnDe.nativeElement.disabled).toBeFalse();
  });

  it('should mark all as touched and not log when submitting invalid form', () => {
    const logSpy = spyOn(console, 'log');

    component.form.setValue({ email: '', password: '' });
    fixture.detectChanges();

    component.onSubmit();

    expect(component.emailCtrl.touched).toBeTrue();
    expect(component.passwordCtrl.touched).toBeTrue();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should log form value on valid submit', () => {
    const logSpy = spyOn(console, 'log');

    component.form.setValue({ email: 'user@example.com', password: 'secret' });
    fixture.detectChanges();

    component.onSubmit();

    expect(logSpy).toHaveBeenCalled();
    const args = logSpy.calls.mostRecent().args;
    expect(args[0]).toContain('Login submit');
    expect(args[1]).toEqual({ email: 'user@example.com', password: 'secret' });
  });
});

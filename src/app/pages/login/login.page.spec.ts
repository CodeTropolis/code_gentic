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

  it('should initialize form with email and password controls', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('should be invalid when empty', () => {
    component.form.setValue({ email: '', password: '' });
    expect(component.form.invalid).toBeTrue();
  });

  it('should validate email format', () => {
    component.form.setValue({ email: 'not-an-email', password: 'secret' });
    expect(component.form.invalid).toBeTrue();
    expect(component.emailCtrl.errors?.['email']).toBeTrue();
  });

  it('should disable submit button when form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    fixture.detectChanges();

    const btnDe = fixture.debugElement.query(By.css('ion-button'));
    expect(btnDe).toBeTruthy();
    expect(btnDe.nativeElement.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.form.setValue({ email: 'a@b.com', password: 'secret' });
    fixture.detectChanges();

    const btnDe = fixture.debugElement.query(By.css('ion-button'));
    expect(btnDe.nativeElement.disabled).toBeFalse();
  });

  it('onSubmit should mark all as touched and not log when invalid', () => {
    const markSpy = spyOn(component.form, 'markAllAsTouched').and.callThrough();
    const logSpy = spyOn(console, 'log');

    component.form.setValue({ email: '', password: '' });
    component.onSubmit();

    expect(markSpy).toHaveBeenCalled();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('onSubmit should log form value when valid', () => {
    const logSpy = spyOn(console, 'log');

    component.form.setValue({ email: 'test@example.com', password: 'pw123456' });
    component.onSubmit();

    expect(component.form.valid).toBeTrue();
    expect(logSpy).toHaveBeenCalled();

    const args = logSpy.calls.mostRecent().args;
    expect(args[0]).toContain('Login submit');
    expect(args[1]).toEqual({ email: 'test@example.com', password: 'pw123456' });
  });
});

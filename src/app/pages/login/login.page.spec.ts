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

  it('should initialize with invalid form and disabled submit button', () => {
    expect(component.form.invalid).toBeTrue();

    const buttonDe = fixture.debugElement.query(By.css('ion-button.submit'));
    expect(buttonDe).toBeTruthy();
    expect(buttonDe.nativeElement.disabled).toBeTrue();
  });

  it('should validate email required and email format', () => {
    const email = component.emailCtrl;

    email.setValue('');
    expect(email.invalid).toBeTrue();
    expect(email.errors?.['required']).toBeTrue();

    email.setValue('not-an-email');
    expect(email.invalid).toBeTrue();
    expect(email.errors?.['email']).toBeTrue();

    email.setValue('user@example.com');
    expect(email.valid).toBeTrue();
  });

  it('should validate password required', () => {
    const password = component.passwordCtrl;

    password.setValue('');
    expect(password.invalid).toBeTrue();
    expect(password.errors?.['required']).toBeTrue();

    password.setValue('secret');
    expect(password.valid).toBeTrue();
  });

  it('should not submit when invalid and should mark as submitted', () => {
    const logSpy = spyOn(console, 'log');

    component.form.patchValue({ email: '', password: '' });
    component.onSubmit();

    expect(component.submitted).toBeTrue();
    expect(component.submittedValue).toBeNull();
    expect(component.form.invalid).toBeTrue();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should submit when valid, log value, and show output in template', () => {
    const logSpy = spyOn(console, 'log');

    component.form.setValue({ email: 'user@example.com', password: 'secret' });
    fixture.detectChanges();

    const buttonDe = fixture.debugElement.query(By.css('ion-button.submit'));
    expect(buttonDe.nativeElement.disabled).toBeFalse();

    component.onSubmit();
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
    expect(component.submitted).toBeTrue();
    expect(component.submittedValue).toEqual({ email: 'user@example.com', password: 'secret' });
    expect(logSpy).toHaveBeenCalledWith('Login submit:', { email: 'user@example.com', password: 'secret' });

    const pre = fixture.debugElement.query(By.css('pre.json'));
    expect(pre).toBeTruthy();
    expect((pre.nativeElement.textContent as string) || '').toContain('user@example.com');
  });

  it('should keep output hidden until valid and submitted', () => {
    // Initially hidden
    let pre = fixture.debugElement.query(By.css('pre.json'));
    expect(pre).toBeNull();

    // Submitted but invalid -> still hidden
    component.form.patchValue({ email: 'bad', password: '' });
    component.onSubmit();
    fixture.detectChanges();

    pre = fixture.debugElement.query(By.css('pre.json'));
    expect(pre).toBeNull();

    // Valid but not submitted -> hidden
    component.submitted = false;
    component.submittedValue = null;
    component.form.setValue({ email: 'user@example.com', password: 'secret' });
    fixture.detectChanges();

    pre = fixture.debugElement.query(By.css('pre.json'));
    expect(pre).toBeNull();
  });
});

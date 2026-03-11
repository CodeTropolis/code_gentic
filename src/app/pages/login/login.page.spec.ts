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

  it('should initialize with invalid form', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.invalid).toBeTrue();
    expect(component.submitted).toBeFalse();
    expect(component.submittedValue).toBeNull();
  });

  it('should disable submit button when form is invalid', () => {
    const btnDe = fixture.debugElement.query(By.css('ion-button'));
    expect(btnDe).toBeTruthy();
    expect(btnDe.nativeElement.disabled).toBeTrue();
  });

  it('should not set submittedValue when submitting invalid form', () => {
    const logSpy = spyOn(console, 'log');

    component.form.setValue({ email: '', password: '' });
    component.onSubmit();

    expect(component.submitted).toBeTrue();
    expect(component.form.invalid).toBeTrue();
    expect(component.submittedValue).toBeNull();
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should submit and log value when form is valid', () => {
    const logSpy = spyOn(console, 'log');

    component.form.setValue({ email: 'test@example.com', password: 'secret' });
    expect(component.form.valid).toBeTrue();

    component.onSubmit();

    expect(component.submitted).toBeTrue();
    expect(component.submittedValue).toEqual({ email: 'test@example.com', password: 'secret' });
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.calls.mostRecent().args[0]).toBe('Login submit:');
    expect(logSpy.calls.mostRecent().args[1]).toEqual({ email: 'test@example.com', password: 'secret' });
  });

  it('should show output only after valid submit', () => {
    // Initially hidden
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.output'))).toBeNull();

    // Submit invalid -> still hidden
    component.form.setValue({ email: '', password: '' });
    component.onSubmit();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.output'))).toBeNull();

    // Submit valid -> visible
    component.form.setValue({ email: 'valid@example.com', password: 'pw' });
    component.onSubmit();
    fixture.detectChanges();

    const output = fixture.debugElement.query(By.css('.output'));
    expect(output).toBeTruthy();

    const pre = fixture.debugElement.query(By.css('.output pre'));
    expect(pre).toBeTruthy();
    expect((pre.nativeElement.textContent as string) || '').toContain('valid@example.com');
  });

  it('getters should return controls', () => {
    expect(component.emailCtrl).toBe(component.form.controls.email);
    expect(component.passwordCtrl).toBe(component.form.controls.password);
  });
});

import { TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const component = fixture.componentInstance;
    expect(component.form.invalid).toBeTrue();
  });

  it('should be valid with email and password', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const component = fixture.componentInstance;

    component.form.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(component.form.valid).toBeTrue();
  });
});

import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonInput,
    IonButton,
    IonText
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

<<<<<<< HEAD
  submitted = false;
  submittedValue: { email: string; password: string } | null = null;

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.submittedValue = null;
      return;
    }

    this.submittedValue = this.form.getRawValue();
    // Proof-of-concept: log the form value
    // eslint-disable-next-line no-console
    console.log('Login submit:', this.submittedValue);
  }

=======
>>>>>>> d6ecda3 (Revision to login.page.* and style change.)
  get emailCtrl() {
    return this.form.controls.email;
  }

  get passwordCtrl() {
    return this.form.controls.password;
  }
<<<<<<< HEAD
=======

  onSubmit(): void {
    if (this.form.invalid) return;
    // Minimal POC: log form value
    // eslint-disable-next-line no-console
    console.log('Login submit:', this.form.getRawValue());
  }
>>>>>>> d6ecda3 (Revision to login.page.* and style change.)
}

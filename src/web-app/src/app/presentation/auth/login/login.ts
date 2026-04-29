import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../application/auth/auth.store';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  readonly #fb = inject(FormBuilder);
  readonly authStore = inject(AuthStore);

  form = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isLoading = this.authStore.isLoading;
  error = this.authStore.error;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.authStore.login({ email: email!, password: password! });
  }

  fieldError(field: 'email' | 'password'): string | null {
    const ctrl = this.form.get(field);
    if (!ctrl?.invalid || !ctrl.touched) return null;
    if (ctrl.hasError('required')) return `${field} is required.`;
    if (ctrl.hasError('email')) return 'Enter a valid email.';
    if (ctrl.hasError('minlength')) return 'Password must be at least 8 chars.';
    return null;
  }
}

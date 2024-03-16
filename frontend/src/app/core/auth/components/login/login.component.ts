import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from '@core/services/message.service';
import { AuthService } from '@auth/services/auth.service';

import { LoginForm, LoginRequestBody } from '@shared/interfaces/auth.interface';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly message = inject(MessageService);
  private readonly auth = inject(AuthService);

  @Output() loading = new EventEmitter<boolean>();

  readonly remember = this.fb.control(false);
  readonly form: FormGroup<LoginForm> = this.fb.group<LoginForm>({
    email: this.fb.control(null, {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control(null, { validators: [Validators.required] }),
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.emit(true);

    this.auth
      .login(this.form.value as LoginRequestBody)
      .pipe(finalize(() => this.loading.emit(false)))
      .subscribe({
        error: error => this.message.error(error),
        next: () => this.message.success('Sesión iniciada correctamente'),
        complete: () => this.router.navigate(['']),
      });
  }
}

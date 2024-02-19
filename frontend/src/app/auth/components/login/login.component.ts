import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
}

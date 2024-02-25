import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() loading = new EventEmitter<boolean>();
  private readonly fb = inject(FormBuilder);

  readonly remember = this.fb.control(false);
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.emit(true);

    // console.log(this.form.value);
  }
}

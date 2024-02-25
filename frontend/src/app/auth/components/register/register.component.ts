import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @Output() loading = new EventEmitter<boolean>();
  private readonly fb = inject(FormBuilder);
  readonly MAX_LENGTH = 24;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.MAX_LENGTH)]],
    surname: ['', [Validators.required, Validators.maxLength(this.MAX_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.emit(true);

    // console.log(this.form.value);
  }
}

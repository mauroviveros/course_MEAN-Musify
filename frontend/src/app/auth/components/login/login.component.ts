import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(MessageService);

  @Output() loading = new EventEmitter<boolean>();

  readonly remember = this.fb.control(false);
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit() {
    if (this.form.invalid) return;
    this.loading.emit(true);

    setTimeout(() => {
      this.message.success('Sesión iniciada correctamente');
      this.loading.emit(false);
      console.log(this.form.value);
    }, 1000);
  }
}

import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(MessageService);

  @Output() loading = new EventEmitter<boolean>();

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

    setTimeout(() => {
      this.message.success('Usuario generado correctamente');
      this.loading.emit(false);
      console.log(this.form.value);
    }, 1000);
  }
}

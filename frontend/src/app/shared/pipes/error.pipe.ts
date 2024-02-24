import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const messages: { [key: string]: string } = {
  required: 'El campo es obligatorio',
  email: 'No es un email valido',
  minlength: 'Longitud mínima: {{ requiredLength }} caracteres',
  maxlength: 'Máximo permitido: {{ requiredLength }} caracteres',
};

@Pipe({
  name: 'error',
  standalone: true,
})
export class ErrorPipe implements PipeTransform {
  private readonly regex = /\{\{\s*(\w+)\s*\}\}/g;

  transform(errors: ValidationErrors | null): string | undefined {
    if (!errors) return;

    const type = Object.keys(errors)[0];
    let message = messages[type] || `ERROR: ${type}`;

    if (typeof errors[type] === 'object') {
      message = message.replace(this.regex, (_, key) => errors[type][key]);
    }

    return message;
  }
}

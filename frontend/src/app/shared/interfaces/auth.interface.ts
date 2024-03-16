import { FormControl } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

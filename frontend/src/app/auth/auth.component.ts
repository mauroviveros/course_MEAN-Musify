import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from './auth.module';

@Component({
  selector: 'auth-wrapper',
  standalone: true,
  imports: [SharedModule, AuthModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}

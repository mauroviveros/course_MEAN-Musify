import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}

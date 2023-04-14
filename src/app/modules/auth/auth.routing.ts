import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';


import { ValidarTokenGuard } from './guards/validar-token.guard';
import { MusifyComponent } from '../../shared/pages/musify/musify.component';

const routes: Routes = [
  {
    path: "",
    component: FormComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent }
    ]
  },
  {
    path: "profile",
    component: MusifyComponent,
    canActivate: [ValidarTokenGuard],
    children: [ { path: "", component: ProfileComponent } ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

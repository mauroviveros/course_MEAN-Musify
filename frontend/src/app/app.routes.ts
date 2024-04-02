import { Routes } from '@angular/router';

import { authGuard } from '@auth/guards/auth.guard';
import { AuthComponent } from '@auth/auth.component';
import { CoreComponent } from '@core/core.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Inicio',
    canActivate: [authGuard],
    component: CoreComponent,
  },
  {
    path: 'auth',
    title: 'Autenticación',
    component: AuthComponent,
  },
];

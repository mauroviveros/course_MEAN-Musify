import { Routes } from '@angular/router';

import { AuthComponent } from './core/modules/auth/auth.component';
import { CoreComponent } from './core/core.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CoreComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

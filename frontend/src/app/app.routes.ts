import { Routes } from '@angular/router';

import { authGuard } from '@auth/guards/auth.guard';
import { AuthComponent } from '@auth/auth.component';
import { CoreComponent } from '@core/core.component';
import { ArtistsComponent } from './modules/artists/artists.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Inicio',
    canActivate: [authGuard],
    component: CoreComponent,
    data: { menu: { icon: 'home' } },
  },
  {
    path: 'artists',
    title: 'Artistas',
    canActivate: [authGuard],
    component: ArtistsComponent,
    data: { menu: { icon: 'person' } },
  },
  {
    path: 'auth',
    title: 'Autenticación',
    component: AuthComponent,
  },
];

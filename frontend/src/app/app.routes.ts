import { Routes } from '@angular/router';

import { authGuard } from '@auth/guards/auth.guard';
import { AuthComponent } from '@auth/auth.component';
import { CoreComponent } from '@core/core.component';
import { ArtistsComponent } from './modules/artists/artists.component';
import { AlbumsComponent } from './modules/albums/albums.component';

export const routes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Inicio',
        component: CoreComponent,
        data: { menu: { icon: 'home' } },
      },
      {
        path: 'artists',
        title: 'Artistas',
        component: ArtistsComponent,
        data: { menu: { icon: 'people_alt' } },
      },
      {
        path: 'albums',
        title: 'Albums',
        component: AlbumsComponent,
        data: { menu: { icon: 'album' } },
      },
    ]
  },
  {
    path: 'auth',
    title: 'Autenticación',
    component: AuthComponent,
  },
];

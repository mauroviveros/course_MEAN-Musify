import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './modules/auth/guards/validar-token.guard';
import { MusifyComponent } from './shared/pages/musify/musify.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [ValidarTokenGuard],
    component: MusifyComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./modules/musify/musify.module").then(m => m.MusifyModule)
      },
      {
        path: "artist",
        loadChildren: () => import("./modules/artist/artist.module").then(m => m.ArtistModule)
      },
      {
        path: "album",
        loadChildren: () => import("./modules/album/album.module").then(m => m.AlbumModule)
      },
      {
        path: "song",
        loadChildren: () => import("./modules/song/song.module").then(m => m.SongModule)
      }
    ]
  },
  {
    path: "auth",
    loadChildren: ()=> import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

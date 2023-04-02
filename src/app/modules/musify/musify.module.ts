import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusifyRoutingModule } from './musify.routing';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MusifyRoutingModule
  ]
})
export class MusifyModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusifyRoutingModule } from './musify.routing';

import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MusifyRoutingModule
  ]
})
export class MusifyModule { }

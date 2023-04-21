import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song.routing';
import { CreateComponent } from './pages/create/create.component';


@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    SongRoutingModule
  ]
})
export class SongModule { }

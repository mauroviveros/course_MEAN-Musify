import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist.routing';

import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArtistRoutingModule
  ]
})
export class ArtistModule { }

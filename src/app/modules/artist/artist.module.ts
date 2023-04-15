import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist.routing';

import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './pages/detail/detail.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    ListComponent,
    NewComponent,
    DetailComponent,
    FormComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ArtistRoutingModule,
    SharedModule
  ]
})
export class ArtistModule { }

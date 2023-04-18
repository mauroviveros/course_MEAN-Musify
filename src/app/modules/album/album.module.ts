import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album.routing';

import { FormComponent } from './components/form/form.component';
import { CreateComponent } from './pages/create/create.component';
import { UpdateComponent } from './pages/update/update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './pages/list/list.component';
import { CardComponent } from './components/card/card.component';
import { DetailComponent } from './pages/detail/detail.component';


@NgModule({
  declarations: [
    CreateComponent,
    FormComponent,
    UpdateComponent,
    ListComponent,
    CardComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlbumRoutingModule,
    SharedModule
  ],
  exports: [
    ListComponent
  ]
})
export class AlbumModule { }

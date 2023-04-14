import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MusifyComponent } from './pages/musify/musify.component';
import { UpdateImgComponent } from './components/update-img/update-img.component';


const components = [
  SidebarComponent,
  MusifyComponent,
  UpdateImgComponent
]

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
